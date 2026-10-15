// src/components/organism/HeroBanner.jsx
import React from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Boton } from '../atoms/Boton'; 

const FEATURED_GAMES = [
  {
    id: '10',
    title: 'Cyber Odyssey 2088',
    subtitle: 'El RPG futurista del año',
    description: 'Explora una metrópolis llena de neon, misiones peligrosas y tecnología avanzada.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    badge: '🔥 Destacado',
    price: '$59.99'
  },
  {
    id: '11',
    title: 'Mythic Realm: Awakening',
    subtitle: 'Oferta de Pre-orden',
    description: 'Enfrenta criaturas legendarias en un mundo abierto masivo.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    badge: '⚡ 20% OFF',
    price: '$49.99'
  },
  {
    id: '12',
    name: 'Starlight Horizon',
    description: 'Exploración espacial y simulación de colonias.',
    price: 39.99,
    image: 'https://via.placeholder.com/400x225?text=Starlight+Horizon'
  }
];

export function Carrusel() {
  const navigate = useNavigate();

  return (
    <section className="hero-banner my-4">
      <Container fluid="lg">
        <Carousel fade interval={5000} className="shadow-lg rounded overflow-hidden">
          {FEATURED_GAMES.map((game) => (
            <Carousel.Item key={game.id}>
              <div
                className="hero-slide p-4 p-md-5 d-flex align-items-center"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.85) 35%, rgba(0, 0, 0, 0.2)), url(${game.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '420px'
                }}
              >
                <Row className="w-100">
                  <Col md={8} lg={6} className="text-white">
                    <span className="badge bg-danger mb-2 fs-6 px-3 py-2">
                      {game.badge}
                    </span>
                    <h1 className="display-4 fw-bold">{game.title}</h1>
                    <h5 className="text-warning mb-3">{game.subtitle}</h5>
                    <p className="lead d-none d-md-block mb-4 text-light">
                      {game.description}
                    </p>
                    <div className="d-flex align-items-center gap-3">
                      <Boton 
                        variant="primary" 
                        size="lg"
                        onClick={() => navigate(`/productos/${game.id}`)}
                      >
                        Ver producto
                      </Boton>
                      <span className="fs-4 fw-bold text-white">{game.price}</span>
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