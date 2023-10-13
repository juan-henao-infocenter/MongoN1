import React from 'react';
import '../styles/ProductCard.css';
const ProductCard = ({ product }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100"> {/* Añadir la clase h-100 para que todas las tarjetas tengan la misma altura */}
        <img
          src={product.images[0]}
          alt={product.title}
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">{product.description}</p>
          <p className="card-text">Precio: ${product.price}</p>
          <button className="btn btn-primary">Comprar</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
