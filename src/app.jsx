import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import ProductDetail from "./components/ProductDetail";

function App() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/categories")
      .then((response) => response.json())
      .then((categoriesData) => {
        console.log("Categorías:", categoriesData);
        setCategories(categoriesData);
      })
      .catch((error) => {
        console.log("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="container my-5">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <div
            className="spinner-grow text-dark"
            style={{ width: "5rem", height: "5rem" }}
            role="status"
          >
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <Routes>
          <Route
            path="/MongoN1"
            element={<ProductList  />}
          />
          <Route
            path="/MongoN1/create-product"
            element={<ProductForm categories={categories} />}
          />
          <Route
            path="/MongoN1/product/:productId"
            element={<ProductDetail />}
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
