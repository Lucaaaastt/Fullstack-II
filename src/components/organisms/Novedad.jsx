
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard.jsx';
import { Novedad } from '../../data/novedad.js';
import { useProductos } from '../../context/ProductosContext';

export function Novedades() {
  const { productos } = useProductos();
  const novedades = Novedad.map(game => productos.find(producto => producto.id === game.id)).filter(Boolean);
  return (
    <section className="py-4">
      <Container>
        <div className="catalog-header text-center mb-5">
          <h2 className="catalog-title">
            <span className="title-accent">NOVEDADES</span>
          </h2>
          <div className="title-glow-line"></div>
        </div>

        <Row xs={1} sm={2} md={3} className="g-4">
          {novedades.map((game) => (
            <Col key={game.id} className="d-flex align-items-stretch">
              <ProductCard product={game} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
