import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'; // Usa el mismo estilo del login

function Registro() {
  const [usuario, setUsuario] = useState({
    login: '',
    clave: '',
    rol: 'usuario',
    activo: true,
    datosUsuario: {
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      fechaNacimiento: '',
      direccion: {
        calle: '',
        numero: '',
        ciudad: '',
        region: '',
        pais: ''
      }
    }
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Manejo para campos anidados
    if (name.includes('.')) {
      const [nivel1, nivel2, nivel3] = name.split('.');
      setUsuario((prev) => ({
        ...prev,
        [nivel1]: {
          ...prev[nivel1],
          [nivel2]: nivel3
            ? {
                ...prev[nivel1][nivel2],
                [nivel3]: value
              }
            : value
        }
      }));
    } else {
      setUsuario((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
      });

      if (response.ok) {
        alert('Cuenta creada correctamente');
        navigate('/login');
      } else {
        const error = await response.json();
        alert('No se pudo crear el usuario: ' + (error?.mensaje || 'Error desconocido'));
      }
    } catch (err) {
      console.error(err);
      alert('Error en la solicitud');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Registro</h2>

        <input type="text" placeholder="Usuario" name="login" value={usuario.login} onChange={handleChange} />
        <input type="password" placeholder="Contraseña" name="clave" value={usuario.clave} onChange={handleChange} />

        <input type="text" placeholder="Nombre" name="datosUsuario.nombre" value={usuario.datosUsuario.nombre} onChange={handleChange} />
        <input type="text" placeholder="Apellido" name="datosUsuario.apellido" value={usuario.datosUsuario.apellido} onChange={handleChange} />
        <input type="email" placeholder="Correo" name="datosUsuario.email" value={usuario.datosUsuario.email} onChange={handleChange} />
        <input type="text" placeholder="Teléfono" name="datosUsuario.telefono" value={usuario.datosUsuario.telefono} onChange={handleChange} />
        <input type="date" placeholder="Fecha de nacimiento" name="datosUsuario.fechaNacimiento" value={usuario.datosUsuario.fechaNacimiento} onChange={handleChange} />

        <input type="text" placeholder="Calle" name="datosUsuario.direccion.calle" value={usuario.datosUsuario.direccion.calle} onChange={handleChange} />
        <input type="number" placeholder="Número" name="datosUsuario.direccion.numero" value={usuario.datosUsuario.direccion.numero} onChange={handleChange} />
        <input type="text" placeholder="Ciudad" name="datosUsuario.direccion.ciudad" value={usuario.datosUsuario.direccion.ciudad} onChange={handleChange} />
        <input type="text" placeholder="Región" name="datosUsuario.direccion.region" value={usuario.datosUsuario.direccion.region} onChange={handleChange} />
        <input type="text" placeholder="País" name="datosUsuario.direccion.pais" value={usuario.datosUsuario.direccion.pais} onChange={handleChange} />

        <button onClick={handleSubmit}>Crear Cuenta</button>
        <a href="#" className="forgot-password" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Volver al Login</a>
      </div>
    </div>
  );
}

export default Registro;

