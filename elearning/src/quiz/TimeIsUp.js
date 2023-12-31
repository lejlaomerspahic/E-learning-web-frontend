import React, { useEffect, useState } from "react";

function TimeIsUp() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.history.back();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      {" "}
      <div className="modall">
        <div className="modal-contentt">
          <h2>Time is up!</h2>
        </div>
      </div>
    </div>
  );
}

export default TimeIsUp;
