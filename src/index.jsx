import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import {
    BrowserRouter as Router
  } from "react-router-dom";
import Header from "./components/Header";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <div className="bg-body-secondary text-white h-100">
      <header className="bg-dark text-light">
        <Header />
      </header>
      <App />
    </div>
  </Router>
);
