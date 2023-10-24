import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useQuery from "../global/useQuery";
import { variable } from "../variable";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./CourseInfo.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faCalendar } from "@fortawesome/free-solid-svg-icons";
import VideoModal from "./VideoModal";

const CourseInfo = () => {
  const { id } = useParams();
  const [courseInfo, setCourseInfo] = useState();
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

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <Navbar></Navbar>
      {course && (
        <div className="divMain">
          <div>
            <h6>
              Course &gt; {course.category} &gt; {course.name}
            </h6>

            <h2> {course.name}</h2>
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
      )}
      <Footer></Footer>
    </div>
  );
};

export default CourseInfo;
