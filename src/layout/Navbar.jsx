import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar({ handleLogout, usuario }) {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        Plataforma Ciudadana
      </div>
      <nav className="navbar-links">
        <span className="bienvenido">
          Bienvenido, {usuario?.datosUsuario?.nombre || 'Usuario'}
        </span>
        <Link to="/crear">Crear Reporte</Link>
        <Link to="/actualizar">Actualizar Reporte</Link>
        <Link to="/eliminar">Eliminar Reporte</Link>
        <Link to="/listar">Listar Reportes</Link>
        <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
      </nav>
    </header>
  );
}

export default Navbar;
