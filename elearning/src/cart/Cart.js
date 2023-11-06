import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Cart.css";
import Footer from "../components/Footer";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "../hook/useUser";
function Cart() {
  const { user } = useUser();
  const [data, setData] = useState(null);
  const storedData = localStorage.getItem("cartData");

  useEffect(() => {
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData);
    }
  }, [storedData]);

  return (
    <div className="cart-container">
      <Navbar></Navbar>

      <h3 style={{ margin: "20px", fontWeight: "600" }}>Shopping cart</h3>
      <div className="product-list">
        {data &&
          data.cartItems?.map((cartItem, index) => (
            <div key={index} className="product-containerrr">
              <div style={{ width: "160px", height: "190px" }}>
                <img
                  className="product-imageee"
                  src={cartItem.product.imageUrl}
                  alt={cartItem.product.title}
                />
              </div>
              <div className="product-info">
                <h3>{cartItem.product.title}</h3>
                <p>Supplier: {cartItem.product.supplier}</p>
                <div className="location">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <p>{cartItem.product.productLocation}</p>
                </div>
                <div
                  style={{
                    height: "0.5px",
                    backgroundColor: "gray",
                    marginTop: "10px",
                  }}
                ></div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    Price:
                    <p
                      style={{
                        color: "green",
                        marginLeft: "5px",
                        fontWeight: "700",
                      }}
                    >
                      {" "}
                      {cartItem.product.price}
                    </p>
                  </div>
                  <div>
                    <FontAwesomeIcon
                      icon={faTruck}
                      style={{ marginRight: "5px" }}
                    />
                    {user.user.location === cartItem.product.productLocation
                      ? "Free Delivery"
                      : "10$"}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Cart;
