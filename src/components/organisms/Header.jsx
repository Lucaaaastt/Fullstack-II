import { Enlace } from '../atoms/Enlace';
import { Navbar } from '../molecules/Navbar';
import '../../../style/Navbar.css';

export function Header({ items = [] }) {
  return (
    <header className="site-header">
      <Enlace href="/" className="site-brand">
        TIENDA JDR
      </Enlace>
      <Navbar items={items} />
    </header>
  );
}



