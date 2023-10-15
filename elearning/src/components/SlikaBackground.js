import React from "react";

function SlikaBackground() {
  const containerStyle = {
    position: "relative",
    color: "white",
  };

  const imageStyle = {
    width: "40%",
    height: "400px",
    margin: "0px",
  };

  const textContainerStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div style={containerStyle}>
      <div style={textContainerStyle}>
        <p>
          Access a wide range of educational materials, from textbooks to study
          guides, designed to meet your academic needs. Dive into interactive
          video lessons and quizzes for self-paced learning and progress
          tracking. Connect with experienced professors and tutors for
          personalized academic guidance and support.
        </p>
      </div>
      <img
        src="https://www.matellio.com/assets/matellio-ent/images/law-firm-software/virtual-law-firm-solutions.png"
        style={imageStyle}
        alt="Pozadinska slika"
        className="background-image"
      />
    </div>
  );
}

export default SlikaBackground;
