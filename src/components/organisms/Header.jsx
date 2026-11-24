import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Enlace } from '../atoms/Enlace';
import { Boton } from '../atoms/Boton';
import { Navbar } from '../molecules/Navbar';
import { obtenerUsuario, cerrarSesion } from '../../context/validacionesLogin';
import '../../../style/Navbar.css';

export function Header({ items = [] }) {
  const [usuario, setUsuario] = useState(obtenerUsuario);
  const navegar = useNavigate();

  useEffect(() => {
    const actualizarUsuario = () => setUsuario(obtenerUsuario());
    window.addEventListener('sesion-actualizada', actualizarUsuario);
    window.addEventListener('storage', actualizarUsuario);
    return () => {
      window.removeEventListener('sesion-actualizada', actualizarUsuario);
      window.removeEventListener('storage', actualizarUsuario);
    };
  }, []);

  function salir() {
    cerrarSesion();
    setUsuario(null);
    navegar('/');
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
              <Enlace href="/admin/productos" className="header-button">
                Administrar productos
              </Enlace>
            )}
            <Boton className="header-button" onClick={salir}>
              Cerrar sesión
            </Boton>
          </>
        ) : (
          <Boton
            className="header-button header-button-login d-inline-flex align-items-center gap-2"
            onClick={() => navegar('/login')}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Iniciar sesión</span>
          </Boton>
        )}
      </div>
    </header>
  );
}
