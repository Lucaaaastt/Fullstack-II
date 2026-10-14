import { useState } from 'react';
import { FormularioLogin } from './FormularioLogin';
import { Enlace } from '../atoms/Enlace';
import { Boton } from '../atoms/Boton';
import { Navbar } from '../molecules/Navbar';
import '../../../style/Navbar.css';

export function Header({ items = [] }) {
  const [mostrarLogin, setMostrarLogin] = useState(false);
  return (
    <header className="site-header">
      <Enlace href="/" className="site-brand">
        TIENDA JDR
      </Enlace>
      <Navbar items={items} />
      <div className="header-account">
        <Boton className="header-button header-button-login" onClick={() => setMostrarLogin(true)}>Iniciar sesión</Boton>
        <Boton className="header-button header-button-register">Registrarse</Boton>
      </div>
      <FormularioLogin mostrar={mostrarLogin} onCerrar={() => setMostrarLogin(false)} />
    </header>
  );
}





