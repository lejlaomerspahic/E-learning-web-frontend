import React from "react";
import "./CourseCart.css";

const CourseCart = ({ course }) => {
  return (
    <div className="course-container">
      <img className="course-image" src={course.imageUrl} alt={course.name} />
      <div className="course-details">
        <h2 className="course-name">{course.name}</h2>
        <p className="course-info">{course.info}</p>
      </div>
    </div>
  );
};

export default CourseCart;
