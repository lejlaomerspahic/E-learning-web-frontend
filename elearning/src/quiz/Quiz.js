import React from "react";
import "./Quiz.css";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();
  const data = [
    {
      id: 1,
      title: "Technology",
      src: "https://webstockreview.net/images/clipart-school-subject-7.png",
    },
    {
      id: 2,
      title: "Mathematics",
      src: "https://cdn-icons-png.flaticon.com/512/5103/5103002.png",
    },
    {
      id: 3,
      title: "Physics",
      src: "https://cdn-icons-png.flaticon.com/512/1050/1050427.png",
    },
    {
      id: 4,
      title: "Chemistry",
      src: "https://cdn-icons-png.flaticon.com/512/4813/4813473.png",
    },
    {
      id: 5,
      title: "English",
      src: "https://cdn-icons-png.flaticon.com/512/9938/9938342.png",
    },
  ];

  const quizByCategory = (category) => {
    navigate(`/quizByCategory/${category}`);
  };

  return (
    <div
      style={{
        marginTop: "40px",
        fontSize: "22px",
        fontWeight: "700",
        color: "grey",
        marginBottom: "20px",
      }}
    >
      Quizzes
      <div className="quiz-container-list">
        {data.map((subject) => (
          <div
            onClick={() => quizByCategory(subject.title)}
            className="quiz-card"
            style={{ width: "250px", height: "170px" }}
            key={subject.id}
          >
            <img
              style={{ width: "50%", height: "80%" }}
              src={subject.src}
            ></img>
            <div
              style={{ fontWeight: "500", fontSize: "18px", marginTop: "5px" }}
            >
              {subject.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
