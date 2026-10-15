import React from 'react';
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const JuegosNovedad = [
  {
    id: 11,
    name: 'Cyberpunk 2077',
    description: 'Cyberpunk 2077 es un RPG de aventura y acción de mundo abierto ambientado en el futuro sombrío de Night City, una peligrosa megalópolis obsesionada con el poder, el glamur y las incesantes modificaciones corporales.',
    price: 39990,
    image: '/Image/cb77.webp'
  },
  {
    id: 12,
    name: 'Kingdom Come: Deliverance II',
    description: 'Un emocionante RPG de acción con mucha narrativa y un exuberante mundo abierto situado en la Europa medieval del siglo XV. No te pierdas la aventura medieval definitiva donde vivirás un viaje de proporciones épicas de la mano del joven Henry.',
    price: 44990,
    image: '/Image/kc2.png'
  },
  {
    id: 3,
    name: 'Gears of War: E-Day',
    description: 'Experimenta el Día de la Emergencia, la brutal historia original de una de las franquicias de disparos en tercera persona más aclamadas del mundo de los videojuegos.',
    price: 59990,
    image: '/Image/gwe.png'
  }
];

export function Carrusel() {
  const navigate = useNavigate();

  return (
    <section className="hero-banner my-4">
      <Container fluid="lg">
        <Carousel fade interval={5000} className="shadow-lg rounded overflow-hidden border border-secondary">
          {JuegosNovedad.map((game) => (
            <Carousel.Item key={game.id}>
              <div
                className="hero-slide p-4 p-md-5 d-flex align-items-center"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9) 40%, rgba(0, 0, 0, 0.3)), url(${game.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '420px'
                }}
              >
                <Row className="w-100">
                  <Col md={8} lg={6} className="text-white">
                    {game.badge && (
                      <span className="badge bg-danger mb-2 fs-6 px-3 py-2 text-uppercase fw-bold">
                        {game.badge}
                      </span>
                    )}

                    <h1 className="display-4 fw-bold">{game.name || game.title}</h1>
                    
                    <p className="lead d-none d-md-block mb-4 text-light">
                      {game.description}
                    </p>

                    <div className="d-flex align-items-center gap-3">
                      <Button 
                        variant="danger" 
                        size="lg"
                        className="fw-bold text-uppercase px-4 py-2"
                        onClick={() => navigate(`/productos/${game.id}`)}
                      >
                        VER PRODUCTO
                      </Button>

                      <span className="fs-3 fw-bold text-danger m-0">
                        ${game.price}
                      </span>
                    </div>
                  </Col>
                </Row>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}

export default Carrusel;