import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import ProductDetail from "./components/ProductDetail";
import queryString from "query-string";

function App() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = queryString.parse(location.search);
    const filter = query.search || "";
    console.log(filter);
    const productsUrl = "https://api.escuelajs.co/api/v1/products";
    console.log(`${productsUrl}${filter ? "/?title=" + filter : ""}`);
    const fetchProducts = fetch(
      `${productsUrl}${filter ? "/?title=" + filter : ""}`
    ).then((response) => response.json());

    const fetchCategories = fetch(
      "https://api.escuelajs.co/api/v1/categories"
    ).then((response) => response.json());

    Promise.all([fetchProducts, fetchCategories])
      .then(([productsData, categoriesData]) => {
        // let filteredProducts = [];

        // productsData.forEach(async (element) => {
        //   try {
        //     const imageResponse = await fetch(element.images[0]);
        //     if (imageResponse.status === 200) {
        //       filteredProducts.push(element);
        //     }
        //   } catch (error) {
        //     console.log("Error al cargar imagen:", error);
        //   }
        // });

        const filteredProducts = productsData.filter((e) =>
          e.images.every((i) => i.includes("http"))
        );

        console.log("Productos:", filteredProducts);
        console.log("Categorías:", categoriesData);
        setProducts(filteredProducts);
        setCategories(categoriesData);
      })
      .catch((error) => {
        console.log("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location.search]);

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
            element={<ProductList products={products} />}
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
