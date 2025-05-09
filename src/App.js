import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './layout/Navbar';
import ListarReportes from './views/ListarReportes';
import CrearReporte from './views/CrearReporte';
import ActualizarReporte from './views/ActualizarReporte';
import EliminarReporte from './views/EliminarReporte';
import { handleDeleteChange, handleDelete } from './controllers/eliminarController';
import { cargarReportes, handleFiltroChange } from './controllers/listarController';
import { handleInputChange, handleSubmit } from './controllers/crearController';
import { handleUpdateChange, handleUpdate } from './controllers/actualizarController';
import Login from './views/login';
import Registro from './views/Registro';
import RecuperarClave from './views/RecuperarClave';

import './App.css';


function App() {
  const [reportes, setReportes] = useState([]);
  const [reporteFiltrado, setReporteFiltrado] = useState('');
  const [nuevoReporte, setNuevoReporte] = useState({
    titulo: '',
    descripcion: '',
    ubicacion: '',
    fechaReporte: '',
    estado: '',
    comentarios: ''
  });

  const [reporteActualizar, setReporteActualizar] = useState({
    id: '',
    titulo: '',
    descripcion: '',
    ubicacion: '',
    fechaReporte: '',
    estado: '',
    comentarios: ''
  });

  const [reporteEliminar, setReporteEliminar] = useState({
    id: '',
    titulo: '',
    descripcion: '',
    ubicacion: '',
    fechaReporte: '',
    estado: '',
    comentarios: ''
  });
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [usuarioActual, setUsuarioActual] = useState(null);



  useEffect(() => {
    if (isAuthenticated) {
      cargarReportes(setReportes);
    }
  }, [isAuthenticated]);
  

  const handleFiltro = (e) => {
    handleFiltroChange(e, setReporteFiltrado);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
  
      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        setUsuarioActual(data.usuario);
        cargarReportes(setReportes); // 🔄 Aquí también se puede forzar
        navigate('/listar');
      } else {
        alert('Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error en login:', error);
      alert('Error al conectar con el servidor');
    }
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCredentials({ username: '', password: '' });
    navigate('/login');
  };
  
  
  
  
  return (
    <>
      {isAuthenticated && <Navbar handleLogout={handleLogout} usuario={usuarioActual} />}

      {isAuthenticated ? (
        <Routes>
          <Route
            path="/listar"
            element={
              <ListarReportes
                reportes={reportes}
                reporteFiltrado={reporteFiltrado}
                handleFiltroChange={handleFiltro}
              />
            }
          />
          <Route
            path="/crear"
            element={
              <CrearReporte
                nuevoReporte={nuevoReporte}
                handleChange={(e) => handleInputChange(e, setNuevoReporte)}
                handleSubmit={(e) => handleSubmit(e, nuevoReporte, setNuevoReporte, cargarReportes, setReportes)}
              />
            }
          />
          <Route
            path="/actualizar"
            element={
              <ActualizarReporte
                reporteActualizar={reporteActualizar}
                reportes={reportes}
                handleUpdateChange={(e) => handleUpdateChange(e, setReporteActualizar, reportes)}
                handleUpdate={(e) => handleUpdate(e, reporteActualizar, setReporteActualizar, cargarReportes, setReportes)}
              />
            }
          />
          <Route
            path="/eliminar"
            element={
              <EliminarReporte
                reporteEliminar={reporteEliminar}
                reportes={reportes}
                handleDeleteChange={(e) => handleDeleteChange(e, setReporteEliminar, reportes)}
                handleDelete={(e) => handleDelete(e, reporteEliminar, setReporteEliminar, cargarReportes, setReportes)}
              />
            }
          />
          <Route path="/" element={<Navigate to="/listar" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                handleLogin={handleLogin}
                credentials={credentials}
                setCredentials={setCredentials}
              />
            }
          />
          <Route path="/registro" element={<Registro />} />
          <Route path="/recuperar-clave" element={<RecuperarClave />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </>
  );
  
}

export default App;
