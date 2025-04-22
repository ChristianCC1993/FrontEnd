function Reporte({ titulo, descripcion, ubicacion, estado, comentarios }) {
    return (
      <div className="reporte">
        <h2>{titulo}</h2>
        <p><strong>Descripción:</strong> {descripcion}</p>
        <p><strong>Ubicación:</strong> {ubicacion}</p>
        <p><strong>Estado:</strong> {estado}</p>
        <p><strong>Comentarios:</strong> {comentarios}</p>
        <hr />
      </div>
    );
  }
  
  export default Reporte;
  