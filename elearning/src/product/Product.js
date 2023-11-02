import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { variable } from "../variable";
import useQuery from "../global/useQuery";
import "./Product.css";
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
function Product() {
  const { id } = useParams();
  const [productInfo, setProductInfo] = useState({});
  const { user } = useUser();
  const [rating, setRating] = useState(false);
  const { favorite, setFavorite } = useFavorite([]);
  const { data: product } = useQuery({
    url: `${variable}/product/${id}`,
  });
  const { data: favorites } = useQuery({
    url: `${variable}/favorite/`,
  });
  useEffect(() => {
    if (product) {
      setProductInfo(product);
    }
    if (favorites) {
      setFavorite(favorites);
    }
  }, [product, favorites]);
  if (productInfo.productLocation === user.user.location) {
    var delivery = "Free Delivery";
  } else {
    delivery = "$10";
  }
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
              <h2 style={{ color: "green" }}>{productInfo.price}</h2>
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
                    setRating(!rating);
                  }}
                >
                  <FontAwesomeIcon
                    icon={i <= rating ? faStar : faStarRegular}
                    size={24}
                    color={i <= rating ? "gold" : "gray"}
                  />
                </div>
              ))}
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
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div
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
