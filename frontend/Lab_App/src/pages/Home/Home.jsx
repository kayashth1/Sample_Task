import React, { useEffect, useState } from "react";
import Nav from "../../components/Navbar/Nav";


function Home() {

  return (
    <>
    <Nav/>
    <div className="flex items-center justify-center h-screen">
  <div className=" text-grey p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    Hello! Welcome to Lab
  </div>
</div>

    </>
  );
}

export default Home;
