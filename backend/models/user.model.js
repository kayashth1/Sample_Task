const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labUserSchema = new Schema({
    fullName: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    labName: {
        type: String,
        required: true
    },
    pinCode: {
        type: String,
        required: true
    },
    labAddress: {
        type: String,
        required: true
    }
}, { timestamps: true });

const LabUser = mongoose.model('LabUser', labUserSchema);

module.exports = LabUser;
