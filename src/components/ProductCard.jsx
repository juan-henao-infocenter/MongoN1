import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProductCard.css";
const ProductCard = ({ product }) => {
  return (
    <div className="product-card col-md-4 mb-4">
      <Link to={`/MongoN1/product/${product._id}`}>
        <div className="card h-100">
          <img
            src={product.images[0]}
            alt={product.title}
            className="card-img-top h-75" // Añade la clase "img-thumbnail" para reducir el tamaño de la imagen
          />
          <div className="card-body d-flex flex-column justify-content-between align-items-center">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">Precio: ${product.price}</p>
            <button className="btn btn-primary">Comprar</button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
