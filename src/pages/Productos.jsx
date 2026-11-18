import { Container, Row, Col } from 'react-bootstrap';
import { useProductos } from '../context/ProductosContext';
import ProductCard from '../components/organisms/ProductCard';
import '../../style/DetalleProducto.css';

function Productos() {
  const { productos, cargando, error } = useProductos();
  if (cargando) return <p role="status">Cargando catálogo...</p>;
  if (error) return <p role="alert">{error}</p>;
  return (
    <Container className="my-5 catalogo-container">
      <div className="catalog-header text-center mb-5">
        <h1 className="catalog-title">
        <span className="title-accent">Catálogo</span>
        </h1>
        <div className="title-glow-line"></div>
      </div>

      <Row className="g-4">
        {productos.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="d-flex align-items-stretch">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Productos;
