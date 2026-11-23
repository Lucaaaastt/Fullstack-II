import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormularioCuenta } from './FormularioCuenta';
import { FormularioLogin } from './FormularioLogin';
import { Enlace } from '../atoms/Enlace';
import { Boton } from '../atoms/Boton';
import { Navbar } from '../molecules/Navbar';
import { obtenerUsuario, cerrarSesion } from '../../context/validacionesLogin';
import '../../../style/Navbar.css';

export function Header({ items = [] }) {
  const [formulario, setFormulario] = useState(null);
  const [usuario, setUsuario] = useState(obtenerUsuario);
  const navegar = useNavigate();

  function salir() {
    cerrarSesion();
    setUsuario(null);
    navegar('/');
  }

  function ingresarAdmin(usuario) {
    setUsuario(usuario);
    navegar('/admin/productos');
  }

  return (
    <header className="site-header">
      <Enlace href="/" className="site-brand">
        TIENDA JDR
      </Enlace>
      <Navbar items={items} />
      <div className="header-account">
        {usuario ? (
          <>
            <span>Hola, {usuario.nombre}</span>
            {usuario.rol === 'ADMIN' && (
              <Enlace href="/admin/productos" className="header-button">Administrar productos</Enlace>
            )}
            <Boton className="header-button" onClick={salir}>Cerrar sesión</Boton>
          </>
        ) : (
          <>
            <Boton className="header-button header-button-login" onClick={() => setFormulario('login')}>Iniciar sesión</Boton>
            <Boton className="header-button header-button-register" onClick={() => setFormulario('registro')}>Registrarse</Boton>
            <Boton className="header-button" onClick={() => setFormulario('admin')}>Iniciar sesión admin</Boton>
          </>
        )}
      </div>
      <FormularioCuenta
        key={formulario || 'cerrado'}
        tipo={formulario === 'admin' ? null : formulario}
        onCerrar={() => setFormulario(null)}
        onAutenticado={setUsuario}
      />
      <FormularioLogin
        mostrar={formulario === 'admin'}
        onCerrar={() => setFormulario(null)}
        tipo="admin"
        onAutenticado={ingresarAdmin}
      />
    </header>
  );
}
