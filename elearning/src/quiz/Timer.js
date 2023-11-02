import React, { useState, useEffect } from "react";

function Timer({ duration, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      if (remainingTime <= 0) {
        clearInterval(timer);
        onTimeout();
      } else {
        setRemainingTime(remainingTime - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [remainingTime, onTimeout]);

  return (
    <div>
      Time Left:
      <span style={{ color: "red", fontWeight: "600" }}>
        {" "}
        {remainingTime} seconds{" "}
      </span>
    </div>
  );
}

export default Timer;
