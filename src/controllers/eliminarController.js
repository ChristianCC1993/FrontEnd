export const handleDeleteChange = (e, setReporteEliminar, reportes) => {
    const { name, value } = e.target;
  
    if (name === 'id') {
      const seleccionado = reportes.find((r) => r._id === value);
      if (seleccionado) {
        setReporteEliminar({
          id: seleccionado._id,
          titulo: seleccionado.titulo,
          descripcion: seleccionado.descripcion,
          ubicacion: seleccionado.ubicacion,
          fechaReporte: seleccionado.fechaReporte
            ? seleccionado.fechaReporte.substring(0, 10)
            : '',
          estado: seleccionado.estado,
          comentarios: seleccionado.comentarios
        });
      } else {
        setReporteEliminar({
          id: '',
          titulo: '',
          descripcion: '',
          ubicacion: '',
          fechaReporte: '',
          estado: '',
          comentarios: ''
        });
      }
    }
  };
  
  export const handleDelete = async (
    e,
    reporteEliminar,
    setReporteEliminar,
    cargarReportes,
    setReportes
  ) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4000/api/reportes/${reporteEliminar.id}`, {
        method: 'DELETE'
      });
  
      if (res.ok) {
        alert('Reporte eliminado exitosamente!');
        setReporteEliminar({
          id: '',
          titulo: '',
          descripcion: '',
          ubicacion: '',
          fechaReporte: '',
          estado: '',
          comentarios: ''
        });
        await cargarReportes(setReportes); // actualiza la lista
      } else {
        alert('Error al eliminar el reporte.');
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };
  