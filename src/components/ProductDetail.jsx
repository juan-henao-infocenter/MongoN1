import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}products/${productId}`, {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        setError(
          "Hubo un error al cargar el producto. Inténtalo de nuevo más tarde."
        );
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleAddToCart = () => {
    // Lógica para agregar al carrito
  };

  const handleBuyNow = () => {
    // Lógica para comprar
  };

  return (
    <div className="container mt-4 text-dark">
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
      <div className="row">
        <div className="col-md-6">
          <Slider {...sliderSettings}>
            {product.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Product ${index}`}
                  className="img-fluid"
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>Precio: ${product.price}</p>
          <div className="d-flex justify-content-evenly">
            <button onClick={handleAddToCart} className="btn btn-primary">
              Agregar al carrito
            </button>
            <button onClick={handleBuyNow} className="btn btn-success">
              Comprar
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default ProductDetail;
