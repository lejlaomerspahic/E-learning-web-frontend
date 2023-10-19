import React from "react";
import "./Course.css";

import { useNavigate } from "react-router-dom";
function Course() {
  const navigate = useNavigate();
  const data = [
    { id: 1, title: "Technology" },
    { id: 2, title: "Mathematics" },
    { id: 3, title: "Physics" },
    { id: 4, title: "Chemistry" },
    { id: 5, title: "English" },
  ];

  const courseByCategory = (category) => {
    navigate(`/courseByCategory/${category}`);
  };

  return (
    <div className="div">
      <p className="courses">Courses</p>
      <div className="subject-container">
        {data.map((subject) => (
          <div
            key={subject.id}
            onClick={() => courseByCategory(subject.title)}
            className="container"
          >
            {subject.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Course;
