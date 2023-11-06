import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Cart.css";
import Footer from "../components/Footer";
function Cart() {
  const [data, setData] = useState("");
  const storedData = localStorage.getItem("cartData");
  useEffect(() => {
    if (storedData) {
      setData(storedData);
    }
  }, [storedData]);

  console.log("data");
  console.log(data);
  return (
    <div className="cart-container">
      <Navbar></Navbar>
      {data.cartItems?.map((cartItem, index) => (
        <div key={index} className="product-container">
          <img src={cartItem.product.imageUrl} alt={cartItem.product.title} />
          <h3>{cartItem.product.title}</h3>
          <p>Supplier: {cartItem.product.supplier}</p>
          <p>Price: {cartItem.product.price}</p>
          <p>Description: {cartItem.product.description}</p>
        </div>
      ))}
      <Footer></Footer>
    </div>
  );
}

export default Cart;
