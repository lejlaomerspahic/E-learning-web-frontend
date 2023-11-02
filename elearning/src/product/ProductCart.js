import React from "react";
import "./ProductList.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
function ProductCart({ product }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };
  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-image">
        <img src={product.imageUrl} alt={product.title} />
      </div>
      <div className="product-details">
        <h5 className="product-title">{product.title}</h5>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            height: "30px",
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon
            style={{
              fontSize: "16px",
              marginRight: "5px",
              color: "rgb(0, 13, 77)",
            }}
            icon={faMapMarkerAlt}
          />
          <p style={{ margin: "0px" }}>{product.productLocation}</p>
        </div>
        <p className="product-supplier">Supplier: {product.supplier}</p>
        <hr className="separator" />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "20px",
          }}
        >
          <p>Price: </p>
          <p className="product-price">{product.price}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCart;
