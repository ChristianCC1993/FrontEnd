import './App.css';
import React, { useState, useEffect } from 'react';
import Reporte from './componentes/Reporte';

function App() {
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/')
      .then(response => {
        console.log('Respuesta bruta:', response);
        return response.json();
      })
      .then(data => {
        console.log('Datos traídos:', data);
        setReportes(data);
      })
      .catch(error => console.error('Error al cargar reportes:', error));
  }, []);
  

  return (
    <div className="App">
      <h1>Reportes Ciudadanos</h1>

      {reportes.map(reporte => (
        <Reporte
          key={reporte._id}
          titulo={reporte.titulo}
          descripcion={reporte.descripcion}
          ubicacion={reporte.ubicacion}
          fechaReporte={reporte.fechaReporte}
          estado={reporte.estado}
          comentarios={reporte.comentarios}
        />
      ))}
    </div>
  );
}

export default App;
