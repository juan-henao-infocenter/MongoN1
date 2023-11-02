import React, { useState } from "react";
import { FaStore } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom"; 

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  console.log(localStorage.getItem("token"))

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(`/MongoN1?search=${searchText}`);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/MongoN1');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white">
      <div className="container">
        <Link to="./MongoN1/" className="navbar-brand text-white">
          <FaStore />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="./MongoN1/" className={`nav-link ${location.pathname === "/MongoN1/" || location.pathname === "/MongoN1" ? "active" : ""}`} onClick={()=>setSearchText("")}>
                Inicio
              </Link>
            </li>
            <li className="nav-item">
            {localStorage.getItem("token") ? (
            <Link to="./MongoN1" className={`nav-link`} onClick={()=>handleLogout()}>
                Cerrar sesión
              </Link>):(
              <Link to="./MongoN1/login" className={`nav-link ${location.pathname.includes('login') ? "active" : ""}`} onClick={()=>setSearchText("")}>
                Iniciar sesión
              </Link>)}
            </li>
          </ul>
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;
