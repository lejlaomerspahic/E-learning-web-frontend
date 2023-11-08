import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "./About.css";
import Navbar from "../components/Navbar";
import Footer from "./Footer";

function About() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="about-container">
        <div className="about-text-container">
          <div className="about-text">
            <h2>Diverse Learning Materials</h2>
            <p>
              Explore an extensive collection of books, study notes, and
              resources tailored to your academic needs. From comprehensive
              textbooks to concise study guides, find everything you need for
              success in your learning.
            </p>
          </div>

          <div className="about-text">
            <h2>Interactive Learning Experience</h2>
            <p>
              Dive into interactive video lessons and engaging quizzes. Learn at
              your own pace, track your progress, and strengthen your
              understanding of various subjects through a dynamic and enjoyable
              learning experience.
            </p>
          </div>

          <div className="about-text">
            <h2>Expert Instructor Services</h2>
            <p>
              Connect with experienced professors and expert instructors ready
              to provide personalized teaching and academic support. Whether you
              need help with a specific subject or want to enhance your skills,
              our instructors are here to guide you.
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          <img
            style={{
              width: "600px",
              height: "400px",
            }}
            src="https://s3.us-west-2.amazonaws.com/optconnectmarketing-uploads/images/Contact-Illustration-02.png"
          ></img>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default About;
