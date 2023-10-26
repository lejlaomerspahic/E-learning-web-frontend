import React from "react";
import "./Background.css";

function Background({ instructor }) {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${instructor.background})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
          height: "250px",
        }}
      ></div>
      <div class="profile-image">
        <img
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "120px",
          }}
          src={instructor.imageUrl}
          alt="Profile Image"
        />
      </div>
      <h1>{instructor.name}</h1>
    </div>
  );
}

export default Background;
