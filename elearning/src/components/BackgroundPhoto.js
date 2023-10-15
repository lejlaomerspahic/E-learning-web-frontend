import React from "react";
import "./BackgroundPhoto.css";
function SlikaBackground() {
  return (
    <div className="containerStyle">
      <div className="text">
        <p>
          Access a wide range of educational materials, from textbooks to study
          guides, designed to meet your academic needs. Dive into interactive
          video lessons and quizzes for self-paced learning and progress
          tracking. Connect with experienced professors and tutors for
          personalized academic guidance and support.
        </p>
      </div>
      <div className="imageStyle">
        <img
          style={{ height: "100%" }}
          alt="Background photo"
          src="https://www.matellio.com/assets/matellio-ent/images/law-firm-software/virtual-law-firm-solutions.png"
        />
      </div>
    </div>
  );
}

export default SlikaBackground;
