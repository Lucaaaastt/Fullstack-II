import { Enlace } from '../atoms/Enlace';

export function Navbar({ items = [] }) {
  return (
    <nav className="nav-links" aria-label="Navegación principal">
      {items.map((item) => (
        <Enlace
          key={item.id}
          href={item.href}
          icon={item.icon}
          className={item.className}
          target={item.target}
          rel={item.rel}
        >
          {item.text}
        </Enlace>
      ))}
    </nav>
  );
}


