import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useQuery from "../global/useQuery";
import { variable } from "../variable";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./CourseInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import VideoModal from "./VideoModal";

const CourseInfo = () => {
  const { id } = useParams();
  const [courseInfo, setCourseInfo] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { data: course } = useQuery({
    url: `${variable}/course/${id}`,
  });

  const formatLastUpdated = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    if (course) {
      setCourseInfo(course);
    }
  }, [course]);

  const splitDescriptionIntoSentences = (description) => {
    return description.split(". ");
  };

  if (course) {
    var descriptionSentences = splitDescriptionIntoSentences(
      course.description
    );
  }

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }
  return (
    <div>
      <Navbar></Navbar>
      {course && (
        <div>
          <div className="divMain">
            <div>
              <h6>
                Course &gt; {course.category} &gt; {course.name}
              </h6>

              <h2 style={{ color: "rgba(10, 0, 100, 0.877) " }}>
                {course.name}
              </h2>
              <h4> {course.info}</h4>

              {course.instructor?.map((instructor, index) => (
                <h6 key={index}>Created by: {instructor.name}</h6>
              ))}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  width: "500px",
                }}
              >
                <h6>
                  <FontAwesomeIcon icon={faCalendar} /> Last updated:{" "}
                  {formatLastUpdated(course.lastUpdated)}
                </h6>
                <h6>
                  <FontAwesomeIcon icon={faGlobe} /> Language: {course.language}
                </h6>
              </div>
            </div>

            <div
              style={{
                backgroundImage: `url(${course.imageUrl})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              className="imageDiv"
            >
              <img
                style={{
                  height: "25%",
                }}
                onClick={openModal}
                src="https://www.freeiconspng.com/uploads/youtube-logo-png-hd-14.png"
              ></img>
            </div>
            <VideoModal
              isOpen={modalIsOpen}
              course={course}
              closeModal={closeModal}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "50px",
              marginRight: "50px",
            }}
          >
            <div className="cont">
              <h3 style={{ marginBottom: "15px", color: "grey" }}>
                What will you learn?
              </h3>
              {descriptionSentences?.map((sentence, index) => (
                <div key={index} className="descriptionContainer">
                  <FontAwesomeIcon
                    style={{ marginTop: "10px", marginRight: "10px" }}
                    icon={faCheck}
                  />
                  <p className="descriptionText">{sentence}</p>
                </div>
              ))}
            </div>
            <div className="contInstructor">
              <h3 style={{ marginBottom: "15px", color: "grey" }}>
                Instuctors:
              </h3>
              <div>
                {course?.instructor.map((instructor, index) => (
                  <div key={index} className="descriptionContainerInstuctor">
                    <div className="image">
                      <img
                        alt="instructor image"
                        style={{
                          height: "100%",
                          width: "100%",
                        }}
                        src={instructor.imageUrl}
                      ></img>
                    </div>
                    <div style={{ textAlign: "justify" }}>
                      <p
                        style={{
                          justifyContent: "space-between",
                          display: "flex",
                          width: "190px",
                          marginBottom: "0px",
                        }}
                      >
                        <p style={{ fontWeight: "bold" }}>{instructor.name},</p>{" "}
                        {instructor.occupation}
                      </p>
                      <p> {truncate(instructor.bio, 170)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CourseInfo;
