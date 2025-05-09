import React from 'react';
import Reporte from '../components/Reporte';

function ListarReportes({ reportes, reporteFiltrado, handleFiltroChange }) {
  const reportesFiltrados = reportes.filter(
    (reporte) => reporteFiltrado === '' || reporte.titulo === reporteFiltrado
  );

  return (

    <>
      <h2 className="titulo-lista">Lista de Reportes</h2>
      <div className="vista-contenedor">

        <div className="filtro-reportes">
          <label>Buscar Reporte:</label>
          <select value={reporteFiltrado} onChange={handleFiltroChange}>
            <option value="">-- Mostrar Todos --</option>
            {reportes.map((reporte) => (
              <option key={reporte._id} value={reporte.titulo}>
                {reporte.titulo}
              </option>
            ))}
          </select>
        </div>

        <div className="lista-reportes">
          {reportesFiltrados.map((reporte) => (
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
      </div>
    </>
  );
}

export default ListarReportes;
