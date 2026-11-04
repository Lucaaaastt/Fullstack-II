
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useProductos } from '../../context/ProductosContext';
import { Novedad } from '../../data/novedad';

export function Carrusel() {
  const navigate = useNavigate();
  const { productos } = useProductos();
  const juegosNovedad = Novedad.map(game => productos.find(producto => producto.id === game.id)).filter(Boolean);

  return (
    <section className="hero-banner my-4">
      <Container fluid="lg">
        <Carousel fade interval={5000} className="shadow-lg rounded overflow-hidden border border-secondary">
          {juegosNovedad.map((game) => (
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
