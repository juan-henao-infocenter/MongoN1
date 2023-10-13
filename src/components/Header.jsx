import React from 'react';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
          <img
            src="../public/logo192.png" // Coloca aquí la ruta de tu logo
            width="30"
            height="30"
            alt="Logo"
            className="d-inline-block align-top"
          />
          Mi Tienda
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                Productos
            </li>
            <li className="nav-item">
                Categorías
            </li>
          </ul>
            <i className="fas fa-shopping-cart"></i>
        </div>
      </div>
    </nav>
  );
};

export default Header;
