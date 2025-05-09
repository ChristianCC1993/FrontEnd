// src/controllers/crearController.js

export const handleInputChange = (e, setNuevoReporte) => {
  const { name, value } = e.target;
  setNuevoReporte((prev) => ({
    ...prev,
    [name]: value
  }));
};

export const handleSubmit = async (e, nuevoReporte, setNuevoReporte, cargarReportes, setReportes) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:4000/api/reportes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoReporte)
    });

    if (response.ok) {
      alert('Reporte creado exitosamente!');
      setNuevoReporte({
        titulo: '',
        descripcion: '',
        ubicacion: '',
        fechaReporte: '',
        estado: '',
        comentarios: ''
      });

      // 👇 Recargar lista de reportes
      await cargarReportes(setReportes);
    } else {
      alert('Error al crear el reporte.');
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
};
