import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [confirmPassword, setConfirmPassword] = useState(undefined);

    const [validated, setValidated] = useState(false);
  
    const handleRegister = (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      console.log(form)  
      console.log(form.checkValidity())  
      if (!form.checkValidity()) {
        event.stopPropagation();
      }
  
      setValidated(true);
  
      // Aquí puedes agregar tu lógica personalizada para validar los campos
      if (form.checkValidity()) {
        // Realiza la llamada a tu API para registrar al usuario
        // Si la validación personalizada es exitosa
      }
    };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Crear Cuenta</h2>
              <form className="needs-validation" noValidate>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">
                    Por favor, ingresa tu nombre.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">
                    Por favor, ingresa un correo válido.
                  </div>
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
                    required
                  />
                  <div className="invalid-feedback">
                    Por favor, ingresa una contraseña.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirmar Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">
                    Por favor, confirma tu contraseña.
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={handleRegister}
                >
                  Registrarse
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
