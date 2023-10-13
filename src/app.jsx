import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import Header from "./components/Header";
function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = fetch('https://api.escuelajs.co/api/v1/products')
      .then((response) => response.json());

    const fetchCategories = fetch('https://api.escuelajs.co/api/v1/categories')
      .then((response) => response.json());

    Promise.all([fetchProducts, fetchCategories])
      .then(([productsData, categoriesData]) => {
        console.log('Productos:', productsData);
        console.log('Categorías:', categoriesData);

        const filteredProducts = productsData.filter((product) =>
          product.images.every((image) => image.includes('http'))
        );

        setProducts(filteredProducts);
        setCategories(categoriesData);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Router>
      <div className="bg-body-secondary text-white h-100">
        <header className="bg-dark text-light">
          <Header />
        </header>
        <div className="container my-5">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<ProductList products={products} />} />
              <Route path="/create-product" element={<ProductForm categories={categories} />} />
            </Routes>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
