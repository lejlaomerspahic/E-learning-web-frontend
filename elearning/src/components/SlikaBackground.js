import React from "react";

function SlikaBackground() {
  let backgroundImage =
    "https://www.drupak.com/sites/default/files/2020-12/Mask%20Group%20115_0.png";
  return (
    <div className="imageContainer" style={{ marginTop: "-80px" }}>
      <img
        src={backgroundImage}
        style={{ margin: "0px", width: "100%", height: "400px" }}
        alt="Pozadinska slika"
        className="background-image"
      />
    </div>
  );
}

export default SlikaBackground;
