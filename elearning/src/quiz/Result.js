import React, { useState, useEffect } from "react";
import "./Result.css";
function Result({ totalScore }) {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(false);
      window.history.back();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!showModal) {
    return null;
  }

  return (
    <div className="modall">
      <div className="modal-contentt">
        <h2>Result</h2>
        <p>Total score: {totalScore}</p>
      </div>
    </div>
  );
}

export default Result;
