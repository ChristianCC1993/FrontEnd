import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

function Login({ credentials, setCredentials, handleLogin }) {
  const navigate = useNavigate();

  useEffect(() => {
    setCredentials({ login: '', clave: '' });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            autoComplete="off"
            type="text"
            placeholder="Usuario"
            value={credentials.login}
            onChange={(e) => setCredentials({ ...credentials, login: e.target.value })}
          />
          <input
            autoComplete="off"
            type="password"
            placeholder="Contraseña"
            value={credentials.clave}
            onChange={(e) => setCredentials({ ...credentials, clave: e.target.value })}
          />

          <a
            href="#"
            className="forgot-password"
            onClick={(e) => {
              e.preventDefault();
              navigate('/recuperar-clave');
            }}
          >
            ¿Olvidó su contraseña?
          </a>

          <a
            href="#"
            className="forgot-password"
            onClick={(e) => {
              e.preventDefault();
              navigate('/registro');
            }}
          >
            Crear una cuenta
          </a>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
