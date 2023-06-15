import { useState } from "react";
import AddProduct from "./Components/AddProduct";
import Header from "./Components/Header";
import Table from "./Components/Table";
import { Route, Routes } from "react-router-dom";

function App() {
  const [productsToEdit, setProductToEdit] = useState([]);

  function handleProductToEdit(productToEdit) {
    setProductToEdit(() => [productToEdit]);
  }
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Table onEdit={handleProductToEdit} />} />
        <Route path="/home" element={<Table onEdit={handleProductToEdit} />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route
          path="/editProduct"
          element={<AddProduct editObj={productsToEdit} />}
        />
      </Routes>
    </div>
  );
}

export default App;
