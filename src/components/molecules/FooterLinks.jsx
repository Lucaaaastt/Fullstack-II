import { Enlace } from '../atoms/Enlace';

export function FooterLinks({ items = [] }) {
  return (
    <nav className="footer-links" aria-label="Enlaces del footer">
      {items.map((item) => (
        <Enlace key={item.id} href={item.href} target={item.target} rel={item.rel}>
          {item.text}
        </Enlace>
      ))}
    </nav>
  );
}


