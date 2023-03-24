import { useState } from "react";
import axios from "axios";

import classes from "./AddProduct.module.css";

function AddProduct() {
  const [_productName, setProductName] = useState("");
  const [_productPrice, setProductPrice] = useState("");
  const [_productQuantity, setProductQuantity] = useState("");

  const onAddProduct = async () => {
    alert(_productPrice);
    axios.post("http://localhost:3030/addProduct", {
      productName: _productName,
      productPrice: _productPrice,
      productQuantity: _productQuantity,
    });
  };
  return (
    <div className={classes.AddProduct}>
      <form>
        <label>Product Name</label>
        <input
          type="text"
          minLength="3"
          onChange={(e) => {
            setProductName(e.target.value);
          }}
        />
        <label>Price</label>
        <input
          type="number"
          min="0.00"
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
          onChange={(e) => {
            setProductQuantity(e.target.value);
          }}
        />
        <button
          className={`${classes.btn} ${classes.addBTN}`}
          onClick={() => {
            onAddProduct(_productName, _productPrice, _productQuantity);
          }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
