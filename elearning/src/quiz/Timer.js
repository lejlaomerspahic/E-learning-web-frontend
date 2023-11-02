import React, { useState, useEffect } from "react";
import TimeIsUp from "./TimeIsUp";

function Timer({ duration }) {
  const [remainingTime, setRemainingTime] = useState(duration + 5);

  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      if (remainingTime <= 0) {
        clearInterval(timer);
        setShowModal(true);
      } else {
        setRemainingTime(remainingTime - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [remainingTime]);

  return (
    <div>
      Time Left:
      <span style={{ color: "red", fontWeight: "600" }}>
        {" "}
        {remainingTime} seconds{" "}
      </span>
      {showModal && <TimeIsUp></TimeIsUp>}
    </div>
  );
}

export default Timer;
