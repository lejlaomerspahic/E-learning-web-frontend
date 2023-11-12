import Navbar from "./Navbar";
import BackgroundPhoto from "./BackgroundPhoto";
import { useUser } from "../hook/useUser";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Course from "../course/Course";
import Somethingforyou from "./Somethingforyou";
import Footer from "./Footer";
import ProductList from "../product/ProductList";
import Quiz from "../quiz/Quiz";

function Home() {
  const { user } = useUser();
  return (
    <div>
      {user ? (
        <div>
          <Navbar />
          <div
            style={{
              paddingLeft: "40px",
              paddingRight: "40px",
            }}
          >
            <BackgroundPhoto />
            <Course />
            {/* <Somethingforyou /> */}
            <ProductList />
            <Quiz />
          </div>
          <Footer />
        </div>
      ) : null}
    </div>
  );
}

export default Home;
