import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./QuizQuestions.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Timer from "./Timer";
import Result from "./Result";

function QuizQuestions() {
  const location = useLocation();
  const quiz = location.state.quiz;
  const [answers, setAnswers] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCheckboxChange = (questionId, optionIndex) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);

    let score = 0;
    for (let i = 0; i < answers.length; i++) {
      const question = quiz.questions[i];
      const isCorrect = answers[i].every(
        (selected, index) =>
          selected === (index === question.correctOptionIndex)
      );
      if (isCorrect) {
        score += 2;
      }
    }
    setTotalScore(score);
  };

  const handleTimeout = () => {};

  return (
    <div>
      <Navbar />
      <div className="quiz-containerr">
        <h1
          style={{
            textAlign: "center",
          }}
        >
          {quiz.name}
        </h1>
        <div>
          <p className="quiz-info">{quiz.description}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Timer duration={quiz.duration} />
        </div>
        <form>
          {quiz.questions.map((question, index) => (
            <div className="question-container" key={question.id}>
              <p className="question-text">
                {index + 1}. {question.questionText}
              </p>
              {question.options.map((option, optionIndex) => (
                <div className="option-container" key={optionIndex}>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={answers[question.id] === optionIndex}
                      onChange={() =>
                        handleCheckboxChange(question.id, optionIndex)
                      }
                    />
                    <span className="option-text">{option}</span>
                  </label>
                </div>
              ))}
            </div>
          ))}
        </form>
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>

        {isSubmitted && (
          <div>
            <Result totalScore={totalScore} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default QuizQuestions;
