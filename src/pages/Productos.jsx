import { Container, Row, Col } from 'react-bootstrap';
import products from '../data/products';
import ProductCard from '../components/organisms/ProductCard';
import '../../style/DetalleProducto.css'

function Productos() {
  return (
    <Container className="my-5 catalogo-container">
      <h1 className="mb-4 catalogo-titulo">CATÁLOGO</h1>
      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="d-flex align-items-stretch">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Productos;