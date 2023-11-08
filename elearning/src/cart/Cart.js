import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Cart.css";
import Footer from "../components/Footer";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { FaTrash } from "react-icons/fa";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "../hook/useUser";
function Cart() {
  const { user } = useUser();
  const [data, setData] = useState({});
  const storedData = localStorage.getItem("cartData");

  useEffect(() => {
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData);
    }
  }, [storedData]);

  const calculateDeliveryCost = (cart, userLocation) => {
    const deliveryItems = cart.filter(
      (item) => item.product.productLocation !== userLocation
    );
    console.log(cart);
    const deliveryCost = deliveryItems.length * 10;
    return deliveryCost;
  };

  const calculateTotalPrice = (priceWithSign, count) => {
    const price = parseFloat(priceWithSign.replace("$", ""));
    return price * count;
  };

  const calculateTotalItemPrice = (cart) => {
    let totalItemPrice = 0;
    console.log(cart);
    cart.forEach((item) => {
      totalItemPrice += calculateTotalPrice(item.product.price, item.count);
    });

    return totalItemPrice;
  };

  const calculateTotalOrderPrice = (cart, userLocation) => {
    const totalItemPrice = calculateTotalItemPrice(cart);
    const deliveryCost = calculateDeliveryCost(cart, userLocation);
    const totalOrderPrice = totalItemPrice + deliveryCost;
    return totalOrderPrice;
  };

  const removeFromCart = (index) => {
    const updatedCartItems = [...data.cartItems];
    updatedCartItems.splice(index, 1);
    const updatedData = { ...data, cartItems: updatedCartItems };
    setData(updatedData);
    localStorage.setItem("cartData", JSON.stringify(updatedData));
  };
  console.log(data.cartItems);
  return (
    <div className="cart-container">
      <Navbar></Navbar>

      <h3 style={{ margin: "20px", fontWeight: "600" }}>Shopping cart</h3>
      <div className="product-list">
        {data ? (
          <div>
            {data.cartItems?.map((cartItem, index) => (
              <div key={index} className="product-containerrr">
                <div style={{ width: "160px", height: "190px" }}>
                  <img
                    className="product-imageee"
                    src={cartItem.product.imageUrl}
                    alt={cartItem.product.title}
                  />
                </div>
                <div className="product-info">
                  <div
                    onClick={() => removeFromCart(index)}
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      marginBottom: "30px",
                      color: "rgba(10, 0, 100, 0.877)",
                      cursor: "pointer",
                    }}
                  >
                    <FaTrash></FaTrash>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h3>{cartItem.product.title}</h3>
                    <h6>x{cartItem.count}</h6>
                  </div>
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
            {data.cartItems?.length > 0 ? (
              <div style={{ width: "600px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "30px",
                  }}
                >
                  <h5>Delivery:</h5>
                  <h5 style={{ color: "green" }}>
                    $
                    {data?.cartItems
                      ? calculateDeliveryCost(
                          data.cartItems,
                          user.user.location
                        )
                      : null}
                  </h5>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h5>Price: </h5>
                  <h5 style={{ color: "green" }}>
                    $
                    {data?.cartItems
                      ? calculateTotalItemPrice(data.cartItems)
                      : null}
                  </h5>
                </div>

                <div
                  style={{
                    height: "1px",
                    backgroundColor: "grey",
                    width: "600px",
                    marginTop: "10px",
                    marginBottom: "10px",
                    backgroundColor: "rgb(228, 228, 228)",
                  }}
                ></div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h4>Total price: </h4>
                  <h4 style={{ color: "green", fontWeight: "600" }}>
                    $
                    {data?.cartItems
                      ? calculateTotalOrderPrice(
                          data.cartItems,
                          user.user.location
                        )
                      : null}
                  </h4>
                </div>
              </div>
            ) : (
              <div className="centered-container">
                <p className="no-items-text">...no items available in cart</p>
              </div>
            )}
          </div>
        ) : (
          <div className="centered-container">
            <p className="no-items-text">...no items available in cart</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
