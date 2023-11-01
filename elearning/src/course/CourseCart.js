import React, { useEffect, useState } from "react";
import "./CourseCart.css";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { variable } from "../variable";
import { useUser } from "../hook/useUser";
import axios from "axios";
import { useFavorite } from "../hook/useFavorite";

const CourseCart = ({ course, onClick, favorites }) => {
  const [favoriteHeart, setFavoriteHeart] = useState(false);
  const { user, setUser } = useUser();
  const { favorite, setFavorite } = useFavorite([]);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  useEffect(() => {
    let item = favorites.find((item) => item.course.id === course.id);
    if (item === undefined) {
      setFavoriteHeart(false);
    } else {
      setFavoriteHeart(true);
      setFavorite(item);
    }
  }, [favorites]);

  const handleFavorite = async () => {
    if (favoriteHeart) {
      setFavoriteHeart(false);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      axios
        .delete(`${variable}/favorite/delete/${favorite.id}`, config)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          if (error.response === 401) {
            setUser(null);
          }
        });
    } else {
      setFavoriteHeart(true);
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
          setFavorite(response.data);
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
        {favoriteHeart ? (
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
