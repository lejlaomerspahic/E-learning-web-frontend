import Navbar from "./Navbar";
import BackgroundPhoto from "./BackgroundPhoto";
import { useUser } from "../hook/useUser";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Course from "../course/Course";
import Somethingforyou from "./Somethingforyou";

function Home() {
  const { user } = useUser();

  return (
    <div>
      {user !== null ? (
        <div>
          <Navbar />
          <BackgroundPhoto />
          <Course />
          <Somethingforyou />
        </div>
      ) : null}
    </div>
  );
}

export default Home;
