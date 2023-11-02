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
import { useFavorite } from "../hook/useFavorite";

function CoursesByCategory({ route }) {
  const [courses, setCourses] = useState([]);
  const { category } = useParams();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { data: coursesByCategory } = useQuery({
    url: `${variable}/course/search/${category}`,
  });

  const { data: coursesByName } = useQuery({
    url: `${variable}/course/search/info/${searchText}`,
  });

  const { favorite, setFavorite } = useFavorite([]);
  const { data: favorites } = useQuery({
    url: `${variable}/favorite/`,
  });
  useEffect(() => {
    if (coursesByCategory) {
      setCourses(coursesByCategory);
    }
    if (favorites) {
      setFavorite(favorites);
    }
  }, [coursesByCategory, favorites]);

  const handleSubmit = () => {
    if (coursesByName) {
      setSearchResults(coursesByName);
    }
  };
  const handleClick = (id) => {
    navigate(`/course/${id}`, { state: { courses } });
  };

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
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button onClick={handleSubmit}>Search</button>
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
        {searchText
          ? searchResults.map((course, index) => (
              <CourseCart
                key={index}
                course={course}
                courses={courses}
                onClick={() => handleClick(course.id)}
              />
            ))
          : courses.map((course, index) => (
              <CourseCart
                key={index}
                course={course}
                courses={courses}
                onClick={() => handleClick(course.id)}
              />
            ))}
      </div>
      <Footer />
    </div>
  );
}

export default CoursesByCategory;
