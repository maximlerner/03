import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import classes from "./AddProduct.module.css";

function AddProduct({ editObj }) {
  const [_productName, setProductName] = useState("");
  const [_productPrice, setProductPrice] = useState("");
  const [_productQuantity, setProductQuantity] = useState("");
  const [_productID, setProductID] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setStates();

    if (window.location.pathname === "/addProduct") resetStates();
  }, [editObj]);

  const setStates = () => {
    if (editObj) setProductID(editObj[0]?.productId);
    if (editObj) setProductName(editObj[0]?.productName);
    if (editObj) setProductPrice(editObj[0]?.productPrice);
    if (editObj) setProductQuantity(editObj[0]?.productQuantity);
  };

  const resetStates = () => {
    setProductID(null);
    setProductName("");
    setProductPrice("");
    setProductQuantity("");
  };

  const onAddProduct = async () => {
    alert(_productPrice);
    axios.post("http://localhost:3030/addProduct", {
      productName: _productName,
      productPrice: _productPrice,
      productQuantity: _productQuantity,
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    console.log(_productID);
    axios
      .put(`http://localhost:3030/updateProduct/${_productID}`, {
        productName: _productName,
        productPrice: _productPrice,
        productQuantity: _productQuantity,
      })
      .then((res) => {
        console.log(res);
        alert("fdf");
      });
    navigate("/home");
  };
  return (
    <div className={classes.AddProduct}>
      <form>
        <label>Product Name</label>
        <input
          type="text"
          minLength="3"
          value={_productName || ""}
          onChange={(e) => {
            setProductName(e.target.value);
          }}
        />
        <label>Price</label>
        <input
          type="number"
          min="0.00"
          value={_productPrice || ""}
          max="9999.00"
          onChange={(e) => {
            setProductPrice(e.target.value);
          }}
        />
        <label>Quantity</label>
        <input
          type="number"
          min="0"
          max="500"
          value={_productQuantity || ""}
          onChange={(e) => {
            setProductQuantity(e.target.value);
          }}
        />
        {!_productID && (
          <button
            className={`${classes.btn} ${classes.addBTN}`}
            onClick={() => {
              onAddProduct(_productName, _productPrice, _productQuantity);
            }}
          >
            Add Product
          </button>
        )}
        {_productID && (
          <button
            className={`${classes.btn} ${classes.addBTN}`}
            onClick={(e) => {
              handleEdit(e);
            }}
          >
            Edit Product
          </button>
        )}
      </form>
    </div>
  );
}

export default AddProduct;
