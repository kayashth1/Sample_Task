require("dotenv").config();
const config = require("./config.json");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const LabUser = require("./models/user.model");

mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

// Create Account
app.post("/create-account", async (req, res) => {
  const { fullName, email, password, labName, pinCode, labAddress } = req.body;


  if (!fullName || !email || !password || !labName || !pinCode || !labAddress) {
    return res.status(400).json({ error: true, message: "All fields are required" });
  }

  const existingUser = await LabUser.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: true, message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newLabUser = new LabUser({
    fullName,
    email,
    password: hashedPassword,
    labName,
    pinCode,
    labAddress
  });

  await newLabUser.save();

  const accessToken = jwt.sign({ userId: newLabUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });

  return res.status(201).json({
    error: false,
    message: "Registration successful",
    accessToken
  });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const labUser = await LabUser.findOne({ email });
  if (!labUser) {
    return res.status(404).json({ error: true, message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, labUser.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: true, message: "Invalid credentials" });
  }

  const accessToken = jwt.sign({ userId: labUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });

  return res.json({
    error: false,
    message: "Login successful",
    accessToken
  });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

module.exports = app;
