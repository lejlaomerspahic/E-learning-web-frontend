import Navbar from "./Navbar";
import BackgroundPhoto from "./BackgroundPhoto";
import { useUser } from "../hook/useUser";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Course from "../course/Course";
import Somethingforyou from "./Somethingforyou";
import Footer from "./Footer";

function Home() {
  return (
    <div>
      <div>
        <Navbar />
        <BackgroundPhoto />
        <Course />
        <Somethingforyou />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
