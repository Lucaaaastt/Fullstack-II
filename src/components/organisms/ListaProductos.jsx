import { Row, Col } from 'react-bootstrap';
import TarjetaProductoAdmin from '../organisms/TarjetaProductoAdmin';

function ListaProductos({ productos }) {
  return (
    <Row className="g-4">
      {productos.map((product) => (
        <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="d-flex align-items-stretch">
          <TarjetaProductoAdmin product={product} />
        </Col>
      ))}
    </Row>
  );
}

export default ListaProductos;