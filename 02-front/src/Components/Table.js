import React, { useEffect, useState } from "react";
import classes from "./Table.module.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function Table({ onEdit }) {
  const [productList, setProductList] = useState([]);
  const [totalItems, setTotalItems] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      Axios.get("http://localhost:3030").then((response) => {
        setProductList(response.data.products);
        setTotalItems(response.data.QuantitySum);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (productID) => {
    try {
      Axios.delete(`http://localhost:3030/deleteProduct/${productID}`).then(
        () => {
          getProducts();
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (id) => {
    const editProduct = productList.find((el) => id === el.productId);
    onEdit(editProduct);
    navigate("/editProduct");
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
                <td className={classes.actions}>
                  <button
                    className={`${classes.btn} ${classes.editBTN}`}
                    value={product.productId}
                    onClick={() => handleEdit(product.productId)}
                  >
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
