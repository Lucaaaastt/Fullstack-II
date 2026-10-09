import { Container } from 'react-bootstrap';
import { Texto } from '../components/atoms/Texto';

export default function SobreNosotros() {
  return (
    <Container className="sobre-nosotros py-5">
      <Texto variant="h1">Sobre nosotros</Texto>
      <Texto>
        Tienda JDR impulsa la idea de tener tu propio juego
        y no solamente una licencia del mismo.
      </Texto>

      <Texto variant="h2">¿Como se creo JDR?</Texto>
      <Texto>
        La tienda está creada con Vite, React y Bootstrap,
        utilizando Atomic Design.
      </Texto>

      <Texto variant="h2">Nuestro equipo</Texto>
      <Texto className="integrante-equipo">Lucas Toledo</Texto>
      <Texto className="integrante-equipo">Ignacio Acevedo</Texto>
    </Container>
  );
}