import { Container } from 'react-bootstrap';
import { Texto } from '../components/atoms/Texto';
import Image from '../components/atoms/Image';

export default function SobreNosotros() {
  return (
    <Container fluid className="sobre-nosotros py-5">
      <Texto variant="h1" className="titulo-equipo">Nuestro equipo</Texto>
      <div className="equipo-integrantes">
        <Texto className="integrante-equipo">Lucas Toledo</Texto>
        <Texto className="integrante-equipo">Ignacio Acevedo</Texto>
        <Texto className="integrante-equipo">Franco Pacheco</Texto>
      </div>

      <Texto variant="h2" className="titulo-presentacion">Sobre nosotros</Texto>
      <Texto className="texto-presentacion">
        Tienda JDR impulsa la idea de tener tu propio juego
        y no solamente una licencia del mismo.
      </Texto>

      <Texto variant="h2" className="titulo-presentacion">¿Cómo se creó JDR?</Texto>
      <Texto className="texto-presentacion">
        La tienda está creada con Vite, React y Bootstrap,
        utilizando Atomic Design.
      </Texto>
      <div className="lenguajes">
        <div className="lenguaje">
          <Image src="/Image/react.svg" alt="" className="icono-lenguaje" />
          <Texto>React</Texto>
        </div>
        <div className="lenguaje">
          <Image src="/Image/javascript.svg" alt="" className="icono-lenguaje" />
          <Texto>JavaScript</Texto>
        </div>
        <div className="lenguaje">
          <Image src="/Image/html.svg" alt="" className="icono-lenguaje" />
          <Texto>HTML</Texto>
        </div>
        <div className="lenguaje">
          <Image src="/Image/css.svg" alt="" className="icono-lenguaje" />
          <Texto>CSS</Texto>
        </div>
      </div>
    </Container>
  );
}









