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
import CourseInfo from "./course/CourseInfo";
import InstructorProfile from "./profile/InstructorProfile";
import Product from "./product/Product";
import QuizByCategory from "./quiz/QuizByCategory";
import QuizQuestions from "./quiz/QuizQuestions";
import Cart from "./cart/Cart";
import About from "./components/About";
import UserProfile from "./nav/UserProfile";
import useQuery from "./global/useQuery";
import { variable } from "./variable";
import axios from "axios";
import Favorites from "./nav/Favorites";
import Quiz from "./nav/Quiz";
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

    let token = JSON.parse(jwtToken);

    if (jwtToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      };
      axios
        .get(`${variable}/user/${token.user}`, config)
        .then((response) => {
          setUser({ user: response.data, token: token.token });
        })

        .catch((error) => {
          if (error.response === 401) {
            setUser(null);
          }
        });
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
          <Route
            path="/course/:id"
            element={
              <ProtectedRoute user={user}>
                <CourseInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor/:id"
            element={
              <ProtectedRoute user={user}>
                <InstructorProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute user={user}>
                <Product />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quizByCategory/:category"
            element={
              <ProtectedRoute user={user}>
                <QuizByCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz/:id"
            element={
              <ProtectedRoute user={user}>
                <QuizQuestions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute user={user}>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute user={user}>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user}>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute user={user}>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz"
            element={
              <ProtectedRoute user={user}>
                <Quiz />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
