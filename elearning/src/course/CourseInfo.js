import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useQuery from "../global/useQuery";
import { variable } from "../variable";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./CourseInfo.css";

const CourseInfo = () => {
  const { id } = useParams();
  const [courseInfo, setCourseInfo] = useState();
  const { data: course } = useQuery({
    url: `${variable}/course/${id}`,
  });

  useEffect(() => {
    if (course) {
      setCourseInfo(course);
    }
  }, [course]);

  console.log(course);
  return (
    <div>
      <Navbar></Navbar>
      {course && (
        <div>
          <div className="divCaption">
            <h2> {course.name}</h2>
            <h4> {course.info}</h4>

            {course.instructors.map((value, index) => (
              <h5 key={index}>{value}</h5>
            ))}

            <div>
              <h5></h5>
              <h5></h5>
            </div>
          </div>

          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${course.videoId}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      )}
      <Footer></Footer>
    </div>
  );
};

export default CourseInfo;
