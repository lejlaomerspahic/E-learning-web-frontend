import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Background from "./Background";
import { useLocation, useParams } from "react-router-dom";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";
import "./InstructorProfile.css";
import useQuery from "../global/useQuery";
import { variable } from "../variable";

function InstructorProfile() {
  const location = useLocation();
  const { instructorC } = location.state;
  const [instructor, setInstructor] = useState({});
  const { data: instructorAll } = useQuery({
    url: `${variable}/instructor/${instructorC.id}`,
  });

  const { data: courseAll } = useQuery({
    url: `${variable}/course/get`,
  });
  const [matchingCourses, setMatchingCourses] = useState([]);
  useEffect(() => {
    if (instructorAll) {
      setInstructor(instructorAll);
    }
    if (courseAll) {
      const courses = instructor.course.map((courseId) =>
        courseAll.find((course) => course.id === courseId)
      );
      setMatchingCourses(courses);
    }
  }, [instructorAll, courseAll]);

  return (
    <div>
      {instructor && (
        <div style={{ color: "gray" }}>
          <Navbar></Navbar>
          <Background instructor={instructor}></Background>
          <div
            style={{
              height: "160px",
              backgroundColor: "white",
              paddingLeft: "450px",
              paddingTop: "20px",
            }}
          >
            <h3>{instructor.name}</h3>
            <h5>{instructor.occupation}</h5>
            <div
              style={{
                justifyContent: "space-between",
                display: "flex",
                width: "400px",
                fontSize: "17px",
              }}
            >
              <div>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> {instructor?.location}
              </div>
              <div>
                <FontAwesomeIcon icon={faFacebook} />{" "}
                {instructor.contact?.website}
              </div>
            </div>
          </div>
          <div className="div-info">
            <div
              style={{
                flexDirection: "column",
                display: "flex",
                fontSize: "17px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "160px",
                  height: "30px",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon icon={faPhone} />
                {instructor.contact?.phone}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "190px",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <FontAwesomeIcon icon={faEnvelope} />{" "}
                {instructor.contact?.email}
              </div>
            </div>
            <div>
              <div
                style={{
                  width: "800px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  paddingTop: "20px",
                  paddingBottom: "10px",
                  textAlign: "justify",
                  backgroundColor: "white",
                }}
              >
                <p>{instructor?.bio}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <div
                  style={{
                    padding: "10px",
                    border: "3px solid white",
                    width: "350px",
                    textAlign: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "165px",
                      alignItems: "center",
                      height: "30px",
                    }}
                  >
                    Working mode:
                    <p
                      style={{
                        color: "blue",
                        marginTop: "15px",
                      }}
                    >
                      {instructor?.workingMode}{" "}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    padding: "10px",
                    border: "3px solid white",
                    width: "350px",
                    textAlign: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "120px",
                      alignItems: "center",
                      height: "30px",
                    }}
                  >
                    Hourly rate:
                    <p
                      style={{
                        color: "blue",
                        marginTop: "15px",
                      }}
                    >
                      {instructor?.hourlyRate}{" "}
                    </p>
                    $
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <div className="courses-main">
            <p style={{ fontSize: "22px", fontWeight: "700" }}>Courses:</p>
            <div className="courses-container">
              {matchingCourses?.map((course) => (
                <div className="course" key={course.id}>
                  <div
                    style={{
                      padding: "0px",
                      borderRadius: "30px",
                      marginBottom: "10px",
                    }}
                  >
                    <img
                      className="imageUri"
                      src={course.imageUrl}
                      alt={course.name}
                    />
                  </div>
                  <p>{course.name}</p>
                </div>
              ))}
            </div>
          </div>
          <Footer></Footer>
        </div>
      )}
    </div>
  );
}

export default InstructorProfile;
