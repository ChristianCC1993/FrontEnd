import React from 'react';

function CrearReporte({ nuevoReporte, handleChange, handleSubmit }) {
  return (
    <div className="App">
      <h2 className="titulo-lista">Crear Nuevo Reporte</h2>

      <form className="formulario-reporte" onSubmit={handleSubmit}>
        <label>Título:</label>
        <input
          type="text"
          name="titulo"
          value={nuevoReporte.titulo}
          onChange={handleChange}
        />

        <label>Descripción:</label>
        <input
          type="text"
          name="descripcion"
          value={nuevoReporte.descripcion}
          onChange={handleChange}
        />

        <label>Ubicación:</label>
        <input
          type="text"
          name="ubicacion"
          value={nuevoReporte.ubicacion}
          onChange={handleChange}
        />

        <label>Fecha del Reporte:</label>
        <input
          type="date"
          name="fechaReporte"
          value={nuevoReporte.fechaReporte}
          onChange={handleChange}
        />

        <label>Estado:</label>
        <input
          type="text"
          name="estado"
          value={nuevoReporte.estado}
          onChange={handleChange}
        />

        <label>Comentarios:</label>
        <input
          type="text"
          name="comentarios"
          value={nuevoReporte.comentarios}
          onChange={handleChange}
        />

        <button type="submit">Crear Reporte</button>
      </form>
    </div>
  );
}

export default CrearReporte;
