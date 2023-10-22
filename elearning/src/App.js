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
import ProtectedRoute from "./hook/ProtectedRoute";

function App() {
  const { user, setUser } = useUser();
  var cookies = document.cookie;

  useEffect(() => {
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
    }
  }, [cookies]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <Welcome />
              </ProtectedRoute>
            }
          />
          <Route path="/user/signin" element={<Signin />} />
          <Route path="/user/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute user={user}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courseByCategory/:category"
            element={
              <ProtectedRoute user={user}>
                <CoursesByCategory />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
