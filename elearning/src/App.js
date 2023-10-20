import "./App.css";
import Welcome from "./components/Welcome";
import Signin from "./components/Signin";
import {
  BrowserRouter,
  Routes,
  Router,
  Route,
  useNavigate,
} from "react-router-dom";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { UserProvider, useUser } from "./hook/useUser";
import CoursesByCategory from "./course/CoursesByCategory";
import { useEffect, useState } from "react";

function App() {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const { setUser } = useUser();
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
      setIsTokenValid(true);
      const userData = JSON.parse(jwtToken);

      setUser((prevUser) => ({
        ...prevUser,
        ...userData,
      }));
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isTokenValid ? <Welcome /> : <Signin />} />
          <Route
            path="/user/signin"
            element={isTokenValid ? <Home /> : <Signin />}
          />
          <Route
            path="/user/signup"
            element={isTokenValid ? <Home /> : <Signup />}
          />
          <Route path="/home" element={isTokenValid ? <Home /> : <Signin />} />
          <Route
            path="/courseByCategory/:category"
            element={isTokenValid ? <CoursesByCategory /> : <Signin />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
