import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  localStorage.removeItem('token');

  const handleLogin = async () => {
    try {
      const mutation = `mutation {
        userLogin(email: "usuario2@example.com", password: "contrasena2")
      }`;
      
      const queryParams = queryString.parse(location.search);
      const redirect = queryParams.redirect;
      const response = await fetch(
        process.env.REACT_APP_API_URL,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: mutation }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("token", data.data.userLogin);
        
        navigate(redirect||'/MongoN1');
      } else {
        console.error("Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Iniciar Sesión</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={handleLogin}
                >
                  Iniciar Sesión
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
