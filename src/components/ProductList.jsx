import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const ProductList = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas

  useEffect(() => {
    const query = queryString.parse(location.search);
    const filter = query.search || "";
    const offset = (currentPage - 1) * 20; // 20 productos por página (valor predeterminado)
    const limit = 20; // Valor predeterminado para la cantidad de productos por página
    const url = "https://api.escuelajs.co/api/v1/products";
    console.log(
      "--------------------------------------------------------------------------------antes del llamado--------------------------------------------"
    );
    // Luego, realiza la llamada al API utilizando el filtro, offset y limit
    fetch(
      `${url}${
        filter === "" ? "?tilte=" + filter + "&" : ""
      }offset=${offset}&limit=${limit}`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(
          "--------------------------------------------------------------------------------despues del llamado--------------------------------------------"
        );
        console.log(response);

        setProducts(response);
        // Calcular el número total de páginas según el total de productos y el límite
        setTotalPages(Math.ceil(response.length / limit));
      })
      .catch((error) => {
        console.log("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location.search, currentPage]); // Agregar currentPage a las dependencias

  // Función para ir a la página anterior
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Función para ir a la página siguiente
  const goToNextPage = () => {
      setCurrentPage(currentPage + 1);
  };

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
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <button className="page-link" onClick={goToPreviousPage}>
                  Previous
                </button>
              </li>
              <li className="page-item">
                <button className="page-link" onClick={goToNextPage}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
      ;
    </div>
  );
};

export default ProductList;
