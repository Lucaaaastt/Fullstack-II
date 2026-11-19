import { Container, Card, Table, Button, Badge, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Texto } from "../components/atoms/Texto";

function DetalleCompra() {
  const location = useLocation();
  const navigate = useNavigate();

  const compra = location.state?.compra;

  if (!compra) {
    return (
      <Container className="my-5 text-center text-white">
        <h2>No hay una compra reciente para mostrar</h2>
        <Button variant="outline-light" className="mt-3" onClick={() => navigate('/productos')}>
          Ir al Catálogo
        </Button>
      </Container>
    );
  }

  const { idVenta, fecha, items = [], total = 0 } = compra;

  return (
    <Container className="my-5">
      <Card className="bg-dark text-white shadow-lg border-0 p-4 mx-auto" style={{ maxWidth: '800px' }}>
        <div className="text-center mb-4">
          <Badge bg="success" className="px-3 py-2 mb-2 fs-6">
            COMPRA CONFIRMADA
          </Badge>
          <Texto variant="h2" className="fw-bold">Detalle de tu Compra</Texto>
          <p className="text-secondary mb-0">
            Orden #{idVenta ?? 'Registrada'} • {fecha}
          </p>
        </div>

        <Table responsive variant="dark" hover className="align-middle mb-4">
          <thead>
            <tr>
              <th>Juego</th>
              <th className="text-center">Cantidad</th>
              <th className="text-end">Precio Unit.</th>
              <th className="text-end">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const cantidad = item.quantity ?? item.cantidad ?? 1;
              return (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }}
                        />
                      )}
                      <span className="fw-semibold">{item.name}</span>
                    </div>
                  </td>
                  <td className="text-center">{cantidad}</td>
                  <td className="text-end">${item.price}</td>
                  <td className="text-end fw-bold">${item.price * cantidad}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <Row className="border-top border-secondary pt-3 align-items-center">
          <Col xs={6}>
            <span className="text-secondary">Estado: Pagado y registrado</span>
          </Col>
          <Col xs={6} className="text-end">
            <span className="fs-5 me-2">Total Pagado:</span>
            <span className="fs-3 fw-bold text-danger">${total}</span>
          </Col>
        </Row>

        <div className="d-flex gap-3 justify-content-center mt-4 flex-wrap">
          <Button variant="danger" size="lg" onClick={() => navigate('/productos')}>
            Seguir Comprando
          </Button>
          <Button variant="outline-light" size="lg" onClick={() => navigate('/')}>
            Volver al Inicio
          </Button>
        </div>
      </Card>
    </Container>
  );
}

export default DetalleCompra;