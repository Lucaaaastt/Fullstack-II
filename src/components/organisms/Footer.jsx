import { Texto } from '../atoms/Texto';
import { ContactInfo } from '../molecules/ContactInfo';
import { FooterLinks } from '../molecules/FooterLinks';
import '../../../style/Footer.css';

export function Footer({ items = [] }) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <Texto variant="h2">TIENDA JDR</Texto>
          <Texto>Tu tienda de videojuegos.</Texto>
        </div>
        <ContactInfo />
        <FooterLinks items={items} />
      </div>
      <Texto className="footer-copyright">
        © {new Date().getFullYear()} Tienda JDR. Todos los derechos reservados.
      </Texto>
    </footer>
  );
}


