import React from "react";
import { Link } from "react-router-dom"; 
import "../styles/ProductCard.css";
const ProductCard = ({ product }) => {
  return (
    <div className="col-md-4 mb-4">
      <Link to={`/MongoN1/product/${product.id}`}>
        <div className="card h-100">
          <img
            src={product.images[0]}
            alt={product.title}
            className="card-img-top"
          />
          <div className="card-body d-flex flex-column justify-content-between align-items-center">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">{product.description}</p>
            <p className="card-text">Precio: ${product.price}</p>
            <button className="btn btn-primary">Comprar</button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
