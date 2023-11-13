import React, { useState, useEffect } from "react";
import useQuery from "../global/useQuery";
import { variable } from "../variable";
import "./Favorites.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
const Favorites = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }
  const { data: course } = useQuery({
    url: `${variable}/course/get`,
  });
  const { data: product } = useQuery({
    url: `${variable}/product/get`,
  });

  useEffect(() => {
    if (course && product) {
      const favoriteCourses = course.filter((item) => item.favorite.length > 0);
      const favoriteProduct = product.filter(
        (item) => item.favorite.length > 0
      );
      setFavoriteItems([...favoriteCourses, ...favoriteProduct]);
    }
  }, [course, product]);

  return (
    <div>
      <Navbar></Navbar>
      <div className="favorites-container">
        <h2>Favorite Items</h2>
        <div className="favorite-items">
          {favoriteItems.map((item, index) => (
            <div className="favorite-item" key={index}>
              {item.videoId ? (
                <div className="course-item">
                  <div className="image-course">
                    <img src={item.imageUrl} alt={item.name} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: "22px",
                        fontWeight: "600",
                        marginTop: "10px",
                      }}
                    >
                      {item.name}
                    </h3>
                    <p style={{ textAlign: "justify" }}>
                      {truncate(item.description, 255)}
                    </p>
                    {item.instructor?.map((instructor, index) => (
                      <div className="instructor-item" key={index}>
                        <img src={instructor.imageUrl} alt={instructor.name} />
                        <p>{instructor.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="product-item">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <div className="image-product">
                      <img src={item.imageUrl} alt={item.name} />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        flexDirection: "column",
                        marginLeft: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          flexDirection: "row",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "22px",
                            fontWeight: "600",
                            margin: "0px",
                          }}
                        >
                          {item.title}
                        </p>
                        <p
                          style={{
                            marginLeft: "10px",
                            color: "green",
                            fontSize: "22px",
                            fontWeight: "600",
                            margin: "0px",
                          }}
                        >
                          {item.price}
                        </p>
                      </div>
                      <div>
                        <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                        {item.productLocation}
                      </div>
                    </div>
                  </div>
                  <div className="info">
                    <p>{truncate(item.description, 335)}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Favorites;
