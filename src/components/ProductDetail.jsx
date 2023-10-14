import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [productId]);

  if (!product) {
    return <div>Cargando...</div>;
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
      <div className="row">
        <div className="col-md-6">
          <Slider {...sliderSettings}>
            {product.images.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Product ${index}`} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>Precio: ${product.price}</p>
          <div className="d-flex justify-content-evenly">
            <button
              onClick={handleAddToCart}
              className="btn btn-primary"
            >
              Agregar al carrito
            </button>
            <button onClick={handleBuyNow} className="btn btn-success">
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
