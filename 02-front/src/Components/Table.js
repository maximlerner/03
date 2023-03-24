import React, { useEffect } from "react";
import classes from "./Table.module.css";
import Axios from "axios";
import { useState } from "react";

function Table() {
  const [productList, setProductList] = useState([]);
  const [totalItems, setTotalItems] = useState();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    Axios.get("http://localhost:3030").then((response) => {
      setProductList(response.data.products);
      setTotalItems(response.data.QuantitySum);
    });
  };

  const handleDelete = (productID) => {
    Axios.delete(`http://localhost:3030/deleteProduct/${productID}`).then(
      () => {
        getProducts();
      }
    );
  };
  return (
    <div className={classes.Table}>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product, index) => {
            return (
              <tr key={product.productId}>
                <td>{index}</td>
                <td>{product.productName}</td>
                <td>{product.productPrice}</td>
                <td>{product.productQuantity}</td>
                <td>
                  <button className={`${classes.btn} ${classes.editBTN}`}>
                    Edit
                  </button>
                  <button
                    className={`${classes.btn} ${classes.deleteBTN}`}
                    value={product.productId}
                    onClick={() => {
                      handleDelete(product.productId);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td className={classes.padding}>Sum:</td>
            <td>Total products:{productList.length}</td>
            <td>#</td>
            <td>Total Items:{totalItems}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Table;
