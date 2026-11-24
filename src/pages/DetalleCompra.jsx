import { useEffect, useState } from 'react';
import { Container, Card, Table, Button, Badge } from 'react-bootstrap';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { obtenerUsuario } from '../context/validacionesLogin';
import { buscarVenta } from '../services/ventas';

function DetalleCompra() {
  const { id } = useParams();
  const navegar = useNavigate();
  const usuarioId = obtenerUsuario()?.id;
  const [resultado, setResultado] = useState({});
  const valido = /^[1-9]\d*$/.test(id || '') && Number.isSafeInteger(Number(id));

  useEffect(() => {
    if (!usuarioId || !valido) return;
    const controlador = new AbortController();
    buscarVenta(id, controlador.signal).then(venta => {
      if (venta.usuarioId !== usuarioId) throw new Error('Esta compra no corresponde a tu cuenta.');
      setResultado({ id, usuarioId, venta });
    }).catch(error => {
      if (error.name !== 'AbortError') setResultado({ id, usuarioId, error: error.message });
    });
    return () => controlador.abort();
  }, [id, usuarioId, valido]);

  if (!usuarioId) return <Navigate to="/login" replace />;
  if (!valido) return <Container className="my-5 text-white"><h2>No hay una compra válida para mostrar</h2><Button onClick={() => navegar('/mis-compras')}>Mis compras</Button></Container>;
  const actual = resultado.id === id && resultado.usuarioId === usuarioId ? resultado : {};
  if (actual.error) return <Container className="my-5 text-white"><p role="alert">{actual.error}</p><Button onClick={() => navegar('/mis-compras')}>Mis compras</Button></Container>;
  if (!actual.venta) return <p role="status">Cargando comprobante...</p>;
  const venta = actual.venta;

  return (
    <Container className="my-5">
      <Card className="bg-dark text-white shadow-lg border-0 p-4 mx-auto" style={{ maxWidth: '800px' }}>
        <div className="text-center mb-4">
          <Badge bg="success" className="mb-2">COMPRA REGISTRADA</Badge>
          <h2>Detalle de tu Compra</h2>
          <p>Orden #{venta.id} • {new Date(venta.fecha).toLocaleString('es-CL')}</p>
        </div>
        <Table responsive variant="dark" className="align-middle">
          <thead><tr><th>Juego</th><th>Cantidad</th><th>Precio Unit.</th><th>Subtotal</th></tr></thead>
          <tbody>{venta.detalles.map(detalle => (
            <tr key={detalle.id}>
              <td>{detalle.imagenUrl && <img src={detalle.imagenUrl} alt="" style={{ width: 50, marginRight: 12 }} />}{detalle.nombreProducto || `Producto #${detalle.productoId}`}</td>
              <td>{detalle.cantidad}</td><td>${detalle.precioUnitario}</td>
              <td>${detalle.precioUnitario * detalle.cantidad}</td>
            </tr>
          ))}</tbody>
        </Table>
        <div className="border-top border-secondary pt-3 d-flex justify-content-between">
          <span>Estado: Registrada</span><strong>Total registrado: ${venta.total}</strong>
        </div>
        <div className="d-flex gap-3 justify-content-center mt-4 flex-wrap">
          <Button variant="danger" onClick={() => navegar('/productos')}>Seguir comprando</Button>
          <Button variant="outline-light" onClick={() => navegar('/mis-compras')}>Mis compras</Button>
        </div>
      </Card>
    </Container>
  );
}
export default DetalleCompra;
