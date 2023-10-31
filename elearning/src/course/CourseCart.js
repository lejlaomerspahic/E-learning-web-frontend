import React, { useState } from "react";
import "./CourseCart.css";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useQuery from "../global/useQuery";
import { variable } from "../variable";
import { useUser } from "../hook/useUser";
import axios from "axios";

const CourseCart = ({ course, onClick }) => {
  const [favorite, setFavorite] = useState(false);
  const { user, setUser } = useUser();

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  const handleFavorite = async () => {
    if (favorite) {
      setFavorite(false);
    } else {
      setFavorite(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      axios
        .post(
          `${variable}/favorite/create`,
          { user: user.user, course: course },
          config
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          if (error.response === 401) {
            setUser(null);
          }
        });
    }
  };

  return (
    <div className="course-container">
      <div style={{ cursor: "pointer" }} onClick={() => onClick(course.id)}>
        <img className="course-image" src={course.imageUrl} alt={course.name} />
        <div className="course-details">
          <h2 className="course-name">{course.name}</h2>
          <p className="course-info">{truncate(course.description, 145)}</p>
        </div>
      </div>
      <div
        onClick={() => handleFavorite()}
        style={{ display: "flex", justifyContent: "end", cursor: "pointer" }}
      >
        {favorite ? (
          <FontAwesomeIcon
            style={{ fontSize: "22px", color: "red" }}
            icon={faHeart}
          />
        ) : (
          <FontAwesomeIcon
            style={{ fontSize: "22px", color: "red" }}
            icon={faHeartOutline}
          />
        )}
      </div>
    </div>
  );
};

export default CourseCart;
