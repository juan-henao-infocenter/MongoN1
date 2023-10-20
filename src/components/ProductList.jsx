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
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = queryString.parse(location.search);
    const filter = query.search || "";
    console.log(filter)
    const offset = (currentPage - 1) * 15; // 20 productos por página (valor predeterminado)
    const limit = 15; // Valor predeterminado para la cantidad de productos por página
    const url = process.env.REACT_APP_API_URL;
    // Luego, realiza la llamada al API utilizando el filtro, offset y limit
    fetch(
      `${url}products?${
        filter === "" ? "" : "filter=" + filter + "&"
      }offset=${offset}&limit=${limit}`,
      {
        method: "GET"
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((response) => {

        try {
          setProducts(response);
          // Calcular el número total de páginas según el total de productos y el límite
          setTotalPages(Math.ceil(response.length / limit));
        } catch (error) {
          setError(error)
          console.error("Error de red:", error);
        }
      })
      .catch((er) => {
        setError(
          "Hubo un error al cargar el producto. Inténtalo de nuevo más tarde."
        );
        console.error("Error:", er);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location, currentPage]); // Agregar currentPage a las dependencias

  if (error) {
    return (
      <div className="container mt-4 text-dark">
        <div className="row">
          <div className="col-md-12">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Función para ir a la página anterior
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Función para ir a la página siguiente
  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            <ProductCard key={product._id} product={product} />
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
