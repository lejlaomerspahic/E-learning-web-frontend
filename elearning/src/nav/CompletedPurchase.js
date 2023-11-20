import axios from "axios";
import React, { useEffect, useState } from "react";
import { variable } from "../variable";
import { useUser } from "../hook/useUser";
import "./CompletedPurchase.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function CompletedPurchase() {
  const { user } = useUser();
  const [transaction, setTransaction] = useState(null);
  const [productInfoData, setProductInfoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${variable}/api/payment/get-transaction/${user.user.id}`
        );
        setTransaction(response.data);

        const productInfoArray = response.data.map((item) => item.productInfo);
        const productInfoPromises = [];
        const productInfoData = [];

        for (const product of productInfoArray) {
          const productPromises = product.map(async (productmap) => {
            return fetchProductInfo(productmap.productId);
          });

          productInfoPromises.push(productPromises);

          const productData = await Promise.all(productPromises);
          productInfoData.push(productData);
        }

        setProductInfoData(productInfoData);
      } catch (error) {}
    };
    fetchData();
  }, [user.user.id]);

  const fetchProductInfo = async (productId) => {
    try {
      const response = await axios.get(`${variable}/product/${productId}`);

      return response.data;
    } catch (error) {
      return null;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div style={{ color: "gray" }}>
      <Navbar></Navbar>
      <h3 style={{ margin: "20px" }}>Completed Purchase</h3>
      <div className="order-container">
        {transaction?.map((order, orderIndex) => (
          <div key={order.id} className="order-item">
            <p>
              <strong>Creation Date:</strong> {formatDate(order.creationDate)}
            </p>
            <p>
              <strong>Products:</strong>
            </p>
            <div className="order-product-list">
              {order.productInfo.map((product, productIndex) => {
                const matchingProductList = productInfoData[orderIndex];
                const matchingProduct = matchingProductList?.find(
                  (data) => data?.id === product?.productId
                );

                return (
                  <div key={productIndex} className="order-product-item">
                    {matchingProduct && (
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            padding: "5px",
                          }}
                        >
                          {matchingProduct.title}
                          <p style={{ color: "green", fontWeight: "500" }}>
                            {matchingProduct.price}
                          </p>
                        </div>
                        <p>
                          <img
                            src={matchingProduct.imageUrl}
                            alt={matchingProduct.title}
                            className="order-product-image"
                          />
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div
              style={{ height: "1px", backgroundColor: "gray", width: "100%" }}
            ></div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <p>
                <strong>Paid:</strong> {order.amount / 100} {order.currency}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Footer></Footer>
    </div>
  );
}
export default CompletedPurchase;
