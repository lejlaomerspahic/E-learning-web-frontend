import React from "react";
import Navbar from "../components/Navbar";
import Background from "./Background";
import { useLocation } from "react-router-dom";

function InstructorProfile() {
  const location = useLocation();
  const { instructor } = location.state;

  return (
    <div>
      <Navbar></Navbar>
      <Background instructor={instructor}></Background>
    </div>
  );
}

export default InstructorProfile;
