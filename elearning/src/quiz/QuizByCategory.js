import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useQuery from "../global/useQuery";
import { variable } from "../variable";
import { useNavigate, useParams } from "react-router-dom";
import QuizCart from "./QuizCart";
export default function QuizByCategory() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { category } = useParams();
  const navigate = useNavigate();
  const { data: quizzesByCategory } = useQuery({
    url: `${variable}/quiz/search/${category}`,
  });
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    if (quizzesByCategory) {
      setQuizzes(quizzesByCategory);
    }
  }, [quizzesByCategory]);

  const handleClick = (id) => {
    navigate(`/quiz/${id}`, { state: { quizzes } });
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className="mainDiv">
        <h2 style={{ color: "grey" }}>Quizzes</h2>
        <div className="divCourse">
          <div>
            <p className="text">Unlock Your Potential with {category} Quiz</p>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search courses by name..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button style={{ backgroundColor: "rgba(10, 0, 100, 0.877)" }}>
                Search
              </button>
            </div>
          </div>
          <div
            style={{
              height: "300px",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <img
              style={{ width: "630px" }}
              src="https://visitedufinn.com/wp-content/uploads/2021/01/quiz-1024x400.png"
              alt="quiz"
            ></img>
          </div>
        </div>
      </div>
      <div className="divCourseCart">
        {searchText
          ? searchResults.map((quiz, index) => (
              <QuizCart
                key={index}
                quiz={quiz}
                quizzes={quizzes}
                onClick={() => handleClick(quiz.id)}
              />
            ))
          : quizzes.map((quiz, index) => (
              <QuizCart
                key={index}
                quiz={quiz}
                quizzes={quizzes}
                onClick={() => handleClick(quiz.id)}
              />
            ))}
      </div>
      <Footer />
    </div>
  );
}
