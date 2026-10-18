import { useState } from 'react';
import { FormularioCuenta } from './FormularioCuenta';
import { FormularioLogin } from './FormularioLogin';
import { Enlace } from '../atoms/Enlace';
import { Boton } from '../atoms/Boton';
import { Navbar } from '../molecules/Navbar';
import '../../../style/Navbar.css';

export function Header({ items = [] }) {
  const [formulario, setFormulario] = useState(null);
  return (
    <header className="site-header">
      <Enlace href="/" className="site-brand">
        TIENDA JDR
      </Enlace>
      <Navbar items={items} />
      <div className="header-account">
        <Boton className="header-button header-button-login" onClick={() => setFormulario('login')}>Iniciar sesión</Boton>
        <Boton className="header-button header-button-register" onClick={() => setFormulario('registro')}>Registrarse</Boton>
        <Boton className="header-button" onClick={() => setFormulario('admin')}>Iniciar sesión admin</Boton>
      </div>
      <FormularioCuenta tipo={formulario} onCerrar={() => setFormulario(null)} /><FormularioLogin mostrar={formulario === 'admin'} onCerrar={() => setFormulario(null)} tipo="admin"/>
    </header>
  );
}