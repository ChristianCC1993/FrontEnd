import './App.css';
import React, { useState, useEffect } from 'react';
import Reporte from './componentes/Reporte';

function App() {
  const [reportes, setReportes] = useState([]);
  const [nuevoReporte, setNuevoReporte] = useState({
    titulo: '',
    descripcion: '',
    ubicacion: '',
    fechaReporte: '',
    estado: '',
    comentarios: ''
  });
  const [reporteActualizar, setReporteActualizar] = useState({
    id: '',
    titulo: '',
    descripcion: '',
    ubicacion: '',
    fechaReporte: '',
    estado: '',
    comentarios: ''
  });
  const [reporteEliminar, setReporteEliminar] = useState({
    id: '',
    titulo: '',
    descripcion: '',
    ubicacion: '',
    fechaReporte: '',
    estado: '',
    comentarios: ''
  });
  const [reporteFiltrado, setReporteFiltrado] = useState('');
  
  const cargarReportes = async () => {
    try {
      const response = await fetch('http://localhost:4000/');
      const data = await response.json();
      setReportes(data);  // Aquí React actualiza automáticamente la lista
    } catch (error) {
      console.error('Error al recargar reportes:', error);
    }
  };
  
  

  useEffect(() => {
    cargarReportes();
  }, []);
  

  const handleChange = (e) => {
    setNuevoReporte({
      ...nuevoReporte,
      [e.target.name]: e.target.value
    });
  };

  const handleFiltroChange = (e) => {
    setReporteFiltrado(e.target.value);
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/', {
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
          cargarReportes();  // <--- Agrega esto aquí
      } else {
        alert('Error al crear el reporte.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/${reporteActualizar.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          titulo: reporteActualizar.titulo,
          descripcion: reporteActualizar.descripcion,
          ubicacion: reporteActualizar.ubicacion,
          fechaReporte: reporteActualizar.fechaReporte,
          estado: reporteActualizar.estado,
          comentarios: reporteActualizar.comentarios
        })
      });
  
      if (response.ok) {
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
        await cargarReportes();  // <-- usar await aquí también
      }
       else {
        alert('Error al actualizar el reporte.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

    const handleUpdateChange = (e) => {
      const { name, value } = e.target;
    
      if (name === 'id') {
        const reporteSeleccionado = reportes.find(r => r._id === value);
    
        if (reporteSeleccionado) {
          setReporteActualizar({
            id: reporteSeleccionado._id,
            titulo: reporteSeleccionado.titulo,
            descripcion: reporteSeleccionado.descripcion,
            ubicacion: reporteSeleccionado.ubicacion,
            fechaReporte: reporteSeleccionado.fechaReporte ? reporteSeleccionado.fechaReporte.substring(0, 10) : '',
            estado: reporteSeleccionado.estado,
            comentarios: reporteSeleccionado.comentarios
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
        setReporteActualizar({
          ...reporteActualizar,
          [name]: value
        });
      }
    };
    const handleDeleteChange = (e) => {
      const { name, value } = e.target;
    
      if (name === 'id') {
        const reporteSeleccionado = reportes.find(r => r._id === value);
    
        if (reporteSeleccionado) {
          setReporteEliminar({
            id: reporteSeleccionado._id,
            titulo: reporteSeleccionado.titulo,
            descripcion: reporteSeleccionado.descripcion,
            ubicacion: reporteSeleccionado.ubicacion,
            fechaReporte: reporteSeleccionado.fechaReporte ? reporteSeleccionado.fechaReporte.substring(0, 10) : '',
            estado: reporteSeleccionado.estado,
            comentarios: reporteSeleccionado.comentarios
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
    const handleDelete = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`http://localhost:4000/${reporteEliminar.id}`, {
          method: 'DELETE'
        });
    
        if (response.ok) {
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
          await cargarReportes();  // <-- esperar que la lista cargue de nuevo
        }
        else {
          alert('Error al eliminar el reporte.');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };
    
  
  

  return (
    <div className="App">
      <h1>Reportes Ciudadanos</h1>

      <div className="bloque-superior">

        <div className="fila-titulos">
          <h3 className="titulo-segmento">Ingresar nuevo reporte</h3>
          <h3 className="titulo-segmento">Actualizar reporte</h3>
          <h3 className="titulo-segmento">Eliminar reporte</h3>
        </div>

        <div className="fila-bloques">
          <div className="segmento">
            {/* Formulario de nuevo reporte */}
            <form className="formulario-reporte" onSubmit={handleSubmit}>
              <label>Título:</label>
              <input type="text" name="titulo" value={nuevoReporte.titulo} onChange={handleChange} />

              <label>Descripción:</label>
              <input type="text" name="descripcion" value={nuevoReporte.descripcion} onChange={handleChange} />

              <label>Ubicación:</label>
              <input type="text" name="ubicacion" value={nuevoReporte.ubicacion} onChange={handleChange} />

              <label>Fecha del Reporte:</label>
              <input type="date" name="fechaReporte" value={nuevoReporte.fechaReporte} onChange={handleChange} />

              <label>Estado:</label>
              <input type="text" name="estado" value={nuevoReporte.estado} onChange={handleChange} />

              <label>Comentarios:</label>
              <input type="text" name="comentarios" value={nuevoReporte.comentarios} onChange={handleChange} />

              <button type="submit">Crear Reporte</button>
            </form>
          </div>

        {/* Bloque 2: Actualizar Reporte */}
        <div className="segmento">
          <form className="formulario-reporte" onSubmit={handleUpdate}>
            <label>Seleccionar Reporte:</label>
            <select name="id" value={reporteActualizar.id} onChange={handleUpdateChange}>
              <option value="">-- Seleccionar Reporte --</option>
              {reportes.map((reporte) => (
                <option key={reporte._id} value={reporte._id}>
                  {reporte.titulo}
                </option>
              ))}
            </select>

            <label>Título:</label>
            <input type="text" name="titulo" value={reporteActualizar.titulo} onChange={handleUpdateChange} />

            <label>Descripción:</label>
            <input type="text" name="descripcion" value={reporteActualizar.descripcion} onChange={handleUpdateChange} />

            <label>Ubicación:</label>
            <input type="text" name="ubicacion" value={reporteActualizar.ubicacion} onChange={handleUpdateChange} />

            <label>Fecha del Reporte:</label>
            <input type="date" name="fechaReporte" value={reporteActualizar.fechaReporte} onChange={handleUpdateChange} />

            <label>Estado:</label>
            <input type="text" name="estado" value={reporteActualizar.estado} onChange={handleUpdateChange} />

            <label>Comentarios:</label>
            <input type="text" name="comentarios" value={reporteActualizar.comentarios} onChange={handleUpdateChange} />

            <button type="submit">Actualizar Reporte</button>
          </form>
        </div>

        {/* Bloque 3: Eliminar (lo dejamos vacío por ahora) */}
        <div className="segmento">
          <form className="formulario-reporte" onSubmit={handleDelete}>
            <label>Seleccionar Reporte:</label>
            <select name="id" value={reporteEliminar.id} onChange={handleDeleteChange}>
              <option value="">-- Seleccionar Reporte --</option>
              {reportes.map((reporte) => (
                <option key={reporte._id} value={reporte._id}>
                  {reporte.titulo}
                </option>
              ))}
            </select>

            <label>Título:</label>
            <input type="text" name="titulo" value={reporteEliminar.titulo} readOnly style={{ backgroundColor: "#eee" }} />

            <label>Descripción:</label>
            <input type="text" name="descripcion" value={reporteEliminar.descripcion} readOnly style={{ backgroundColor: "#eee" }} />

            <label>Ubicación:</label>
            <input type="text" name="ubicacion" value={reporteEliminar.ubicacion} readOnly style={{ backgroundColor: "#eee" }} />

            <label>Fecha del Reporte:</label>
            <input type="date" name="fechaReporte" value={reporteEliminar.fechaReporte} readOnly style={{ backgroundColor: "#eee" }} />

            <label>Estado:</label>
            <input type="text" name="estado" value={reporteEliminar.estado} readOnly style={{ backgroundColor: "#eee" }} />

            <label>Comentarios:</label>
            <input type="text" name="comentarios" value={reporteEliminar.comentarios} readOnly style={{ backgroundColor: "#eee" }} />

            <button type="submit">Eliminar Reporte</button>
          </form>
        </div>
        </div>

      </div>

      <h2 className="titulo-lista">Lista de Reportes</h2>

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


      <h2 className="titulo-lista">Lista de Reportes</h2>
      <div className="lista-reportes">
  {reportes
    .filter(reporte => reporteFiltrado === '' || reporte.titulo === reporteFiltrado)
    .map(reporte => (
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
  );
}

export default App;
