import React from "react";
import "./QuizCart.css";

function QuizCart({ quiz, onClick }) {
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <div className="quiz-container">
      <img className="quiz-image" src={quiz.imageUrl} alt={quiz.name} />
      <div className="quiz-details">
        <h2 className="quiz-name">{quiz.name}</h2>
        <p className="quiz-info">{truncate(quiz.description, 145)}</p>
      </div>
      <div
        style={{
          textAlign: "center",
          width: "200px",
          alignItems: "center",
          padding: "10px",
          backgroundColor: "rgba(10, 0, 100, 0.877)",
          color: "white",
          borderRadius: "20px",
          fontWeight: "500",
          cursor: "pointer",
        }}
        onClick={() => onClick(quiz.id)}
      >
        START QUIZ
      </div>
    </div>
  );
}

export default QuizCart;
