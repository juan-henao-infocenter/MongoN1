import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const ProductList = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = queryString.parse(location.search);
    const filter = query.search || "";

    // Luego, realiza la llamada al API utilizando el filtro
    fetch(`https://api.escuelajs.co/api/v1/products/?title=${filter}`)
      .then((response) => response.json())
      .then((productsData) => {
        const filteredProducts = productsData.filter((e) =>
          e.images.every((i) => i.includes("http"))
        );

        setProducts(filteredProducts);
      })
      .catch((error) => {
        console.log("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location.search]);

  return (
    <div className="row">
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
        <>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </>
      )}
    </div>
  );
};

export default ProductList;
