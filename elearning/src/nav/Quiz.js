import React, { useEffect, useState } from "react";
import { useUser } from "../hook/useUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faArrowCircleDown,
  faMinusCircle,
  faArrowCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import useQuery from "../global/useQuery";
import { variable } from "../variable";
function Quiz() {
  const { user } = useUser();

  console.log(user);

  const { data: result } = useQuery({
    url: `${variable}/user/result/${user.user.id}`,
  });
  const [userResult, setUserResult] = useState();

  useEffect(() => {
    if (result) {
      setUserResult(result);
    }
  }, [result]);

  console.log(userResult);
  return (
    <div style={{ color: "grey" }}>
      <Navbar></Navbar>
      <h2 style={{ margin: "20px" }}>Completed quizzes</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          justifyContent: "space-between",
          margin: "20px",

          minHeight: "50vh",
        }}
      >
        {userResult?.map((item) => (
          <div
            style={{
              width: "600px",
              height: "300px",
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(203, 209, 238, 0.228)",
              borderRadius: "20px",
              marginBottom: "20px",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "250px", height: "250px" }}>
              <img
                style={{ width: "100%", height: "100%" }}
                src={item.quiz.imageUrl}
              ></img>
            </div>
            <div
              style={{
                marginLeft: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2>{item.quiz.name}</h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ marginRight: "20px" }}>{item.quiz.difficulty}</p>
                <div>
                  <FontAwesomeIcon icon={faClock} /> {item.quiz.duration}
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "rgba(203, 209, 238, 0.5)",
                  padding: "10px",
                  borderRadius: "10px",
                  marginTop: "10px",
                  fontWeight: "500",
                }}
              >
                Score: {item.userScore} / {item.quiz.totalPoints}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Quiz;
