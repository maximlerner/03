import "./App.css";
import AddProduct from "./Components/AddProduct";
import Header from "./Components/Header";
import Table from "./Components/Table";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/home" element={<Table />} />
        <Route path="/addProduct" element={<AddProduct />} />
      </Routes>
    </div>
  );
}

export default App;
