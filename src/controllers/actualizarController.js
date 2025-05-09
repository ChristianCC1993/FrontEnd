export const handleUpdateChange = (e, setReporteActualizar, reportes) => {
    const { name, value } = e.target;
  
    if (name === 'id') {
      const seleccionado = reportes.find((r) => r._id === value);
      if (seleccionado) {
        setReporteActualizar({
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
        setReporteActualizar({
          id: '',
          titulo: '',
          descripcion: '',
          ubicacion: '',
          fechaReporte: '',
          estado: '',
          comentarios: ''
        });
      }
    } else {
      setReporteActualizar((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  export const handleUpdate = async (
    e,
    reporteActualizar,
    setReporteActualizar,
    cargarReportes,
    setReportes
  ) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4000/api/reportes/${reporteActualizar.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reporteActualizar)
      });
  
      if (res.ok) {
        alert('Reporte actualizado exitosamente!');
        setReporteActualizar({
          id: '',
          titulo: '',
          descripcion: '',
          ubicacion: '',
          fechaReporte: '',
          estado: '',
          comentarios: ''
        });
        await cargarReportes(setReportes); // vuelve a cargar la lista
      } else {
        alert('Error al actualizar el reporte.');
      }
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };
  