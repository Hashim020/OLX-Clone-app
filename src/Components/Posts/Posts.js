import React, { useState, useEffect, useContext } from "react";

import Heart from "../../assets/Heart";
import "./Post.css";
import { firebaseContext } from "../../store/Context";
import { collection, getDocs } from "firebase/firestore";
import { postContext } from "../../store/postContext";
import { useNavigate } from "react-router-dom";

function Posts() {
  const { db } = useContext(firebaseContext);
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(postContext);
  const navigate = useNavigate();

  useEffect(() => {
    getDocs(collection(db, "products")).then((snapshot) => {
      const allpost = snapshot.docs.map((product) => {
        return { ...product.data(), id: product.id };
      });
      setProducts(allpost);
    });
  },[db]);

  return (
    <div className="postParentDiv">
        <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
        </div>
        <div className="cards">
          {products.map((product) => {
            return (
              <div
                className="card"
                onClick={() => {
                  setPostDetails(product);
                  navigate("/viewItem");
                }}
              >
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.name}</span>
                  <p className="name"> {product.category}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.map((product) => {
            return (
              <div
                className="card"
                onClick={() => {
                  setPostDetails(product);
                  navigate("/viewItem");
                }}
              >
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.name}</span>
                  <p className="name"> {product.category}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Posts;
