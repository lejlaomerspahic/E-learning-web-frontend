import "./App.css";
import Welcome from "./components/Welcome";
import Signin from "./components/Signin";
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Home from "./components/Home";
import UserProvider from "./hook/useUser";
import CoursesByCategory from "./course/CoursesByCategory";
import { useEffect, useState } from "react";
function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />}></Route>
            <Route path="/user/signin" element={<Signin />}></Route>
            <Route path="/user/signup" element={<Signup />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route
              path="/courseByCategory/:category"
              element={<CoursesByCategory />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
