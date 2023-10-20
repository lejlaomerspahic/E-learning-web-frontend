import React, { useEffect, useState } from "react";
import { variable } from "../variable";
import axios from "axios";
import { useUser } from "../hook/useUser";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./CoursesByCategory.css";
import CourseCart from "./CourseCart";

function CoursesByCategory({ route }) {
  const [courses, setCourses] = useState([]);
  const { category } = useParams();
  const { user } = useUser();
  console.log("user");
  console.log(user);
  useEffect(() => {
    const handleSearch = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const response = await axios.get(
          `${variable}/course/search/course/${category}`,
          config
        );
        setCourses(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    handleSearch();
  }, [user, category]);

  return (
    <div>
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
      </div>
    </div>
  );
}

export default CoursesByCategory;
