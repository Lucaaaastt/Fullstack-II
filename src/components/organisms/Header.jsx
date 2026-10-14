import { Enlace } from '../atoms/Enlace';
import { Boton } from '../atoms/Boton';
import { Navbar } from '../molecules/Navbar';
import '../../../style/Navbar.css';

export function Header({ items = [] }) {
  return (
    <header className="site-header">
      <Enlace href="/" className="site-brand">
        TIENDA JDR
      </Enlace>
      <Navbar items={items} />
      <div className="header-account">
        <Boton className="header-button header-button-login">Iniciar sesión</Boton>
        <Boton className="header-button header-button-register">Registrarse</Boton>
      </div>
    </header>
  );
}




