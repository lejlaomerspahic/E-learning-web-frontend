import React, { useEffect, useState } from "react";
import "./ProductList.css";
import { variable } from "../variable";
import useQuery from "../global/useQuery";
import ProductCart from "./ProductCart";

function ProductList() {
  const [productList, setProductList] = useState([]);
  const { data: products } = useQuery({
    url: `${variable}/product/get`,
  });

  useEffect(() => {
    if (products) {
      setProductList(products);
    }
  }, [products]);

  return (
    <div className="main">
      <p style={{ fontSize: "22px", fontWeight: "700", margin: "0px" }}>
        Products
      </p>
      <div className="horizontal-scroll">
        {productList.map((product, index) => (
          <div className="class">
            <ProductCart key={index} product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
