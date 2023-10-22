import React, { useEffect, useState } from "react";
import { variable } from "../variable";
import axios from "axios";
import { useUser } from "../hook/useUser";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./CoursesByCategory.css";
import CourseCart from "./CourseCart";
import useQuery from "../global/useQuery";
import Footer from "../components/Footer";

function CoursesByCategory({ route }) {
  const [courses, setCourses] = useState([]);
  const { category } = useParams();
  const { user } = useUser();

  const { data } = useQuery({
    url: `${variable}/course/search/course/${category}`,
  });
  useEffect(() => {
    if (data) {
      console.log(data);
      setCourses(data);
    }
  }, [data]);

  return (
    <div>
      <Navbar></Navbar>
      <div className="mainDiv">
        <h2 style={{ color: "grey" }}>Courses</h2>
        <div className="divCourse">
          <div>
            <p className="text">
              Unlock Your Potential with {category} Courses
            </p>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search courses by name..."
                value=""
                onChange={(e) => {}}
              />
              <button>Search</button>
            </div>
          </div>
          <div className="divImage">
            <img
              style={{ width: "100%" }}
              src="https://cdni.iconscout.com/illustration/premium/thumb/student-graduated-from-online-courses-2769742-2302760.png"
              alt="course"
            ></img>
          </div>
        </div>
      </div>
      <div className="divCourseCart">
        {courses.map((course, index) => (
          <CourseCart key={index} course={course} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default CoursesByCategory;
