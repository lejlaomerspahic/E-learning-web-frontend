import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./QuizQuestions.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Timer from "./Timer";
import Result from "./Result";
import axios from "axios";
import { useUser } from "../hook/useUser";
import { variable } from "../variable";

function QuizQuestions() {
  const location = useLocation();
  const quiz = location.state.quiz;
  const [answers, setAnswers] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { user, setUser } = useUser();
  const handleCheckboxChange = (questionId, optionIndex) => {
    setAnswers((prevAnswers) => {
      const existingAnswer = prevAnswers.find(
        (answer) => answer.questionId === questionId
      );

      if (existingAnswer) {
        return prevAnswers.map((answer) =>
          answer.questionId === questionId
            ? {
                ...answer,
                selectedOptions: optionIndex,
              }
            : answer
        );
      } else {
        return [...prevAnswers, { questionId, optionIndex }];
      }
    });
  };
  const handleSubmit = () => {
    setIsSubmitted(true);

    let score = 0;

    answers.forEach((answer) => {
      const question = quiz.questions.find((q) => q.id === answer.questionId);
      const isCorrect = answer.optionIndex === question.correctOptionIndex;
      if (isCorrect) {
        score += 2;
      }
    });
    setTotalScore(score);

    let quizId = quiz.id;

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    axios
      .post(
        `${variable}/user/user-quiz`,
        { quizId: quizId, score: score },
        config
      )
      .then((response) => {})
      .catch((error) => {
        if (error.response === 401) {
          setUser(null);
        }
      });
  };

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
