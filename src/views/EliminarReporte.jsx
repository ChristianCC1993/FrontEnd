import React from 'react';

function EliminarReporte({
  reporteEliminar,
  reportes,
  handleDeleteChange,
  handleDelete
}) {
  return (
    <div className="vista-contenedor2">
      <h2 className="titulo-lista">Eliminar Reporte</h2>

      <div className="contenedor-formulario">
        <form className="formulario-reporte" onSubmit={handleDelete}>
          <label>Seleccionar Reporte:</label>
          <select
            name="id"
            value={reporteEliminar.id}
            onChange={handleDeleteChange}
          >
            <option value="">-- Seleccionar Reporte --</option>
            {reportes.map((reporte) => (
              <option key={reporte._id} value={reporte._id}>
                {reporte.titulo}
              </option>
            ))}
          </select>

          <label>Título:</label>
          <input type="text" name="titulo" value={reporteEliminar.titulo} readOnly />

          <label>Descripción:</label>
          <input type="text" name="descripcion" value={reporteEliminar.descripcion} readOnly />

          <label>Ubicación:</label>
          <input type="text" name="ubicacion" value={reporteEliminar.ubicacion} readOnly />

          <label>Fecha del Reporte:</label>
          <input type="date" name="fechaReporte" value={reporteEliminar.fechaReporte} readOnly />

          <label>Estado:</label>
          <input type="text" name="estado" value={reporteEliminar.estado} readOnly />

          <label>Comentarios:</label>
          <input type="text" name="comentarios" value={reporteEliminar.comentarios} readOnly />

          <button type="submit">Eliminar Reporte</button>
        </form>
      </div>
    </div>
  );
}

export default EliminarReporte;
