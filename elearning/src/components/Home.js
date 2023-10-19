import Navbar from "./Navbar";
import BackgroundPhoto from "./BackgroundPhoto";
import { useUser } from "../hook/useUser";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Course from "../course/Course";
import Somethingforyou from "./Somethingforyou";

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
    } else if (!user) {
      navigate("/user/signin");
    }
  }, []);

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
