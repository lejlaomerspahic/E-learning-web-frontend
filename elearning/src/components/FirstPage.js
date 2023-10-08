import React from "react";
import "./FirstPage.css";

function FirstPage() {
  let backgroundImage =
    "https://cdni.iconscout.com/illustration/premium/thumb/female-teacher-teaching-her-student-2769749-2302767.png";
  return (
    <div className="home-container">
      <div className="content">
        <h1>Dobrodošli!</h1>
        <h2>Jeste li spremni da učite?</h2>
        <h3>
          Ova aplikacija sadrži mnoštvo sadržaja koji će olakšati vaše učenje!
        </h3>
        <div className="buttons">
          <button>PRIJAVA</button>
          <button>REGISTRACIJA</button>
        </div>
      </div>
      <div className="imageContainer">
        <img
          src={backgroundImage}
          alt="Pozadinska slika"
          className="background-image"
        />
      </div>
    </div>
  );
}

export default FirstPage;
