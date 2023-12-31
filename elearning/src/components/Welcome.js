import React, { useEffect } from "react";
import "./Welcome.css";
import { Link, useNavigate } from "react-router-dom";

function Pocetna() {
  const navigate = useNavigate();
  const handlePrijaviSeClick = () => {
    navigate("/user/signin");
  };

  const handleRegistrujSeClick = () => {
    navigate("/user/signup");
  };
  useEffect(() => {
    const cookies = document.cookie;
    if (cookies) {
      navigate("/home");
    }
  });

  let backgroundImage =
    "https://cdni.iconscout.com/illustration/premium/thumb/female-teacher-teaching-her-student-2769749-2302767.png";
  return (
    <div className="home-container">
      <div className="content">
        <h1 style={{ fontWeight: "bold", fontSize: "50px" }}>Welcome!</h1>
        <h3>Are you ready to learn?</h3>
        <h6>
          This application contains a wealth of content that will facilitate
          your learning!{" "}
        </h6>
        <div className="buttons">
          <button className="button" onClick={handlePrijaviSeClick}>
            SIGN IN
          </button>

          <button onClick={handleRegistrujSeClick} className="button">
            SIGN UP
          </button>
        </div>
      </div>
      <div className="imageContainer">
        <img
          src={backgroundImage}
          alt="Background photo"
          className="background-image"
        />
      </div>
    </div>
  );
}

export default Pocetna;
