import React from 'react';

function ActualizarReporte({
  reporteActualizar,
  reportes,
  handleUpdateChange,
  handleUpdate
}) {
  return (
    <>
      <h2 className="titulo-lista">Actualizar Reporte</h2>

      <div className="contenedor-formulario">
        <form className="formulario-reporte" onSubmit={handleUpdate}>
          <label>Seleccionar Reporte:</label>
          <select
            name="id"
            value={reporteActualizar.id}
            onChange={handleUpdateChange}
          >
            <option value="">-- Seleccionar Reporte --</option>
            {reportes.map((reporte) => (
              <option key={reporte._id} value={reporte._id}>
                {reporte.titulo}
              </option>
            ))}
          </select>

          <label>Título:</label>
          <input
            type="text"
            name="titulo"
            value={reporteActualizar.titulo}
            onChange={handleUpdateChange}
          />

          <label>Descripción:</label>
          <input
            type="text"
            name="descripcion"
            value={reporteActualizar.descripcion}
            onChange={handleUpdateChange}
          />

          <label>Ubicación:</label>
          <input
            type="text"
            name="ubicacion"
            value={reporteActualizar.ubicacion}
            onChange={handleUpdateChange}
          />

          <label>Fecha del Reporte:</label>
          <input
            type="date"
            name="fechaReporte"
            value={reporteActualizar.fechaReporte}
            onChange={handleUpdateChange}
          />

          <label>Estado:</label>
          <input
            type="text"
            name="estado"
            value={reporteActualizar.estado}
            onChange={handleUpdateChange}
          />

          <label>Comentarios:</label>
          <input
            type="text"
            name="comentarios"
            value={reporteActualizar.comentarios}
            onChange={handleUpdateChange}
          />

          <button type="submit">Actualizar Reporte</button>
        </form>
      </div>
    </>
  );
}

export default ActualizarReporte;
