import React from "react";
import "./CourseCart.css";

const CourseCart = ({ course, onClick }) => {
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <div className="course-container" onClick={() => onClick(course.id)}>
      <img className="course-image" src={course.imageUrl} alt={course.name} />
      <div className="course-details">
        <h2 className="course-name">{course.name}</h2>
        <p className="course-info">{truncate(course.description, 157)}</p>
      </div>
    </div>
  );
};

export default CourseCart;
