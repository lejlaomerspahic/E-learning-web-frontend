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
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 109, 0.482)",
          }}
        ></div>
      </div>
      <div className="profile-image">
        <img
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "120px",
          }}
          className="img-img"
          src={instructor.imageUrl}
          alt="Profile Image"
        />
      </div>
    </div>
  );
}

export default Background;
