import Navbar from "./Navbar";
import SlikaBackground from "./SlikaBackground";
import { useUser } from "../hook/useUser";
import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
function Home() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const cookies = document.cookie;

    function getCookieValue(cookieName) {
      const cookieArray = cookies.split("; ");
      for (const cookie of cookieArray) {
        const [name, value] = cookie.split("=");
        if (name === cookieName) {
          return value;
        }
      }
      return null;
    }

    const jwtToken = getCookieValue("jwtToken");

    if (jwtToken) {
      const userData = JSON.parse(jwtToken);

      setUser((prevUser) => ({
        ...prevUser,
        ...userData,
      }));
    } else {
      navigate("/user/signin");
    }
  }, [setUser]);

  return (
    <div>
      {user !== null ? (
        <div>
          <Navbar />
          <SlikaBackground />
        </div>
      ) : null}
    </div>
  );
}

export default Home;
