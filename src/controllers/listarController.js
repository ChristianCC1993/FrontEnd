export const cargarReportes = async (setReportes) => {
    try {
      const res = await fetch('http://localhost:4000/api/reportes');
      const data = await res.json();
      setReportes(data);
    } catch (error) {
      console.error('Error al cargar reportes:', error);
    }
  };
  
  export const handleFiltroChange = (e, setReporteFiltrado) => {
    setReporteFiltrado(e.target.value);
  };
  