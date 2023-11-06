import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { variable } from "../variable";
import useQuery from "../global/useQuery";
import "./Product.css";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";

import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import { useUser } from "../hook/useUser";
import { useFavorite } from "../hook/useFavorite";
import axios from "axios";
function Product() {
  const { id } = useParams();
  const [productInfo, setProductInfo] = useState({});

  const [favoriteHeart, setFavoriteHeart] = useState(false);
  const { user, setUser } = useUser();
  const { favorite, setFavorite } = useFavorite([]);
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [count, setCount] = useState(1);
  const { data: product } = useQuery({
    url: `${variable}/product/${id}`,
  });

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };

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
          { user: user.user, product: product },
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
  useEffect(() => {
    if (product) {
      setProductInfo(product);
      const item = product.favorite.length > 0;
      setFavoriteHeart(item);
      checkRating();
    }
  }, [product]);

  if (productInfo.productLocation === user.user.location) {
    var delivery = "Free Delivery";
  } else {
    delivery = "$10";
  }

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
          { user: user.user.id, product: product.id, rating: rating },
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
        `${variable}/rating/productRatings?param1=${product.id}&param2=${user.user.id}`,
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

  const saveToLocalStorage = (user, productInfo, count) => {
    const existingData = JSON.parse(localStorage.getItem("cartData")) || {
      user: null,
      cartItems: [],
    };

    if (user) {
      existingData.user = user;
    }

    existingData.cartItems.push({ product: productInfo, count });

    localStorage.setItem("cartData", JSON.stringify(existingData));
  };

  return (
    <div>
      <Navbar />
      <div className="book-main">
        <div className="book-image">
          <img
            src={productInfo.imageUrl}
            style={{ borderRadius: "20px", width: "100%", height: "100%" }}
          ></img>
        </div>
        <div className="book-description">
          <div style={{ height: "350px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2>{productInfo.title}</h2>
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

            <h5>{productInfo.description}</h5>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "rgba(203, 209, 238, 0.228)",
                padding: "15px",
                alignItems: "center",
                borderRadius: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <FontAwesomeIcon
                  style={{
                    fontSize: "20px",
                    color: "rgb(0, 13, 77)",
                    marginRight: "5px",
                  }}
                  icon={faMapMarkerAlt}
                />{" "}
                {productInfo.productLocation}
              </div>

              <div style={{ fontWeight: "500" }}>
                <FontAwesomeIcon
                  style={{ color: "rgb(0, 13, 77)", marginRight: "5px" }}
                  icon={faTruck}
                ></FontAwesomeIcon>{" "}
                {delivery}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "5px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                <FontAwesomeIcon
                  onClick={increment}
                  icon={faPlusCircle}
                  style={{ cursor: "pointer" }}
                />
                <div
                  style={{
                    marginLeft: "5px",
                    marginRight: "5px",
                    color: "green",
                  }}
                >
                  {count}
                </div>
                <FontAwesomeIcon icon={faMinusCircle} onClick={decrement} />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  fontSize: "20px",
                  fontWeight: "700",
                  marginTop: "5px",
                }}
              >
                Price:
                <div
                  style={{
                    color: "green",
                    fontWeight: "800",
                    fontSize: "22px",
                    marginLeft: "10px",
                  }}
                >
                  {productInfo.price}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div
              onClick={() => saveToLocalStorage(user.user, productInfo, count)}
              style={{
                backgroundColor: "rgba(10, 0, 100, 0.877)",
                width: "250px",
                padding: "13px",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                color: "white",
                fontSize: "20px",
                justifyContent: "center",
              }}
            >
              <FontAwesomeIcon
                style={{ marginRight: "5px" }}
                icon={faCartShopping}
              ></FontAwesomeIcon>{" "}
              ADD TO CART
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Product;
