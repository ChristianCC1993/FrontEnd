import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

function RecuperarClave() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRecuperar = () => {
    if (!email) {
      alert('Por favor, ingresa tu correo');
      return;
    }

    // Aquí se haría una petición real al backend para recuperación de clave
    alert('Si tu correo está registrado, recibirás instrucciones pronto.');
    navigate('/login');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Recuperar Contraseña</h2>
        <input
          type="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleRecuperar}>Enviar</button>
        <a
          href="#"
          className="forgot-password"
          onClick={(e) => {
            e.preventDefault();
            navigate('/login');
          }}
        >
          Volver al Login
        </a>
      </div>
    </div>
  );
}

export default RecuperarClave;
