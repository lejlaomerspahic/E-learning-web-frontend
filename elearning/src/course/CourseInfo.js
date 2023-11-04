import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useQuery from "../global/useQuery";
import { variable } from "../variable";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./CourseInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import VideoModal from "./VideoModal";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { useUser } from "../hook/useUser";
import { useFavorite } from "../hook/useFavorite";
import axios from "axios";
import { faCartShopping, faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
const CourseInfo = () => {
  const { id } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [favoriteHeart, setFavoriteHeart] = useState(false);
  const { user, setUser } = useUser();
  const { favorite, setFavorite } = useFavorite([]);

  const navigate = useNavigate();

  const { data: course } = useQuery({
    url: `${variable}/course/${id}`,
  });

  const formatLastUpdated = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    if (course) {
      const item = course.favorite.length > 0;
      setFavoriteHeart(item);
      checkRating();
    }
  }, [course]);

  const splitDescriptionIntoSentences = (description) => {
    return description.split(". ");
  };

  if (course) {
    var descriptionSentences = splitDescriptionIntoSentences(
      course.description
    );
  }

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

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
        .then((response) => {})
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

  const submitRating = async (rating) => {
    if (rating > 0) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      axios
        .post(
          `${variable}/rating/create`,
          { user: user.user.id, course: course.id, rating: rating },
          config
        )
        .then((response) => {
          console.log(response.data);

          checkRating();
        })
        .catch((error) => {
          if (error.response === 401) {
            setUser(null);
          }
        });
    }
  };

  const checkRating = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const response = await axios.get(
        `${variable}/rating/courseRatings?param1=${course.id}&param2=${user.user.id}`,
        config
      );

      console.log(response.data);
      if (response.data.userRating !== undefined) {
        setRating(response.data.userRating.rating);
      }

      if (response.data.averageRating !== undefined) {
        setAverageRating(response.data.averageRating);
      }
    } catch (error) {}
  };
  return (
    <div>
      <Navbar></Navbar>
      {course && (
        <div>
          <div className="divMain">
            <div>
              <h6>
                Course &gt; {course.category} &gt; {course.name}
              </h6>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <h2 style={{ color: "rgba(10, 0, 100, 0.877) " }}>
                  {course.name}{" "}
                </h2>
                {
                  <div
                    onClick={() => handleFavorite()}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {favoriteHeart ? (
                      <FontAwesomeIcon
                        style={{
                          fontSize: "24px",
                          color: "red",
                          marginLeft: "10px",
                        }}
                        icon={faHeart}
                      />
                    ) : (
                      <FontAwesomeIcon
                        style={{
                          fontSize: "24px",
                          color: "red",
                          marginLeft: "10px",
                        }}
                        icon={faHeartOutline}
                      />
                    )}
                  </div>
                }
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontSize: "20px",
                  marginBottom: "5px",
                }}
              >
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    onClick={() => {
                      submitRating(i);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={i <= rating ? faStar : faStarRegular}
                      size={24}
                      color={i <= rating ? "gold" : "gray"}
                    />
                  </div>
                ))}
                <p style={{ marginLeft: "5px" }}> ({averageRating})</p>
              </div>
              <h4> {course.info}</h4>

              {course.instructor?.map((instructor, index) => (
                <h6 key={index}>Created by: {instructor.name}</h6>
              ))}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  width: "500px",
                }}
              >
                <h6>
                  <FontAwesomeIcon icon={faCalendar} /> Last updated:{" "}
                  {formatLastUpdated(course.lastUpdated)}
                </h6>
                <h6>
                  <FontAwesomeIcon icon={faGlobe} /> Language: {course.language}
                </h6>
              </div>
            </div>

            <div
              style={{
                backgroundImage: `url(${course.imageUrl})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              className="imageDiv"
            >
              <img
                style={{
                  height: "25%",
                }}
                onClick={openModal}
                src="https://www.freeiconspng.com/uploads/youtube-logo-png-hd-14.png"
              ></img>
            </div>
            <VideoModal
              isOpen={modalIsOpen}
              course={course}
              closeModal={closeModal}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "50px",
              marginRight: "50px",
            }}
          >
            <div className="cont">
              <h3 style={{ marginBottom: "15px", color: "grey" }}>
                What will you learn?
              </h3>
              {descriptionSentences?.map((sentence, index) => (
                <div key={index} className="descriptionContainer">
                  <FontAwesomeIcon
                    style={{ marginTop: "10px", marginRight: "10px" }}
                    icon={faCheck}
                  />
                  <p className="descriptionText">{sentence}</p>
                </div>
              ))}
            </div>
            <div className="contInstructor">
              <h3 style={{ marginBottom: "15px", color: "grey" }}>
                Instuctors:
              </h3>
              <div>
                {course?.instructor.map((instructorC, index) => (
                  <div key={index} className="descriptionContainerInstuctor">
                    <div className="image">
                      <img
                        alt="instructor image"
                        style={{
                          height: "100%",
                          width: "100%",
                        }}
                        src={instructorC.imageUrl}
                      ></img>
                    </div>
                    <div style={{ textAlign: "justify" }}>
                      <p
                        style={{
                          justifyContent: "flex-start",
                          display: "flex",
                          marginBottom: "0px",
                        }}
                      >
                        <p
                          className="instructor-name"
                          style={{ fontWeight: "bold", cursor: "pointer" }}
                          onClick={() =>
                            navigate(`/instructor/${instructorC.id}`, {
                              state: { instructorC },
                            })
                          }
                        >
                          {instructorC.name},
                        </p>
                        {instructorC.occupation}
                      </p>
                      <p style={{ width: "370px" }}>
                        {" "}
                        {truncate(instructorC.bio, 170)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CourseInfo;
