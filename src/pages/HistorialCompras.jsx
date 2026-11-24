import { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import { obtenerUsuario } from '../context/validacionesLogin';
import { listarCompras } from '../services/ventas';

export default function HistorialCompras() {
  const usuarioId = obtenerUsuario()?.id;
  const [resultado, setResultado] = useState({});
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    if (!usuarioId) return;
    const controlador = new AbortController();
    listarCompras(usuarioId, controlador.signal).then(ventas => {
      if (ventas.some(venta => venta.usuarioId !== usuarioId)) throw new Error('El historial recibido no corresponde a tu cuenta.');
      setResultado({ usuarioId, intento, ventas });
    }).catch(error => {
      if (error.name !== 'AbortError') setResultado({ usuarioId, intento, error: error.message });
    });
    return () => controlador.abort();
  }, [usuarioId, intento]);

  if (!usuarioId) return <Navigate to="/login" replace />;
  const actual = resultado.usuarioId === usuarioId && resultado.intento === intento ? resultado : {};
  return <Container className="my-5 text-white">
    <h1>Mis compras</h1>
    {actual.error ? <><p role="alert">{actual.error}</p><Button onClick={() => setIntento(i => i + 1)}>Reintentar</Button></>
      : !actual.ventas ? <p role="status">Cargando compras...</p>
      : actual.ventas.length === 0 ? <p>Todavía no tienes compras registradas.</p>
      : <Table responsive variant="dark">
        <thead><tr><th>Orden</th><th>Fecha</th><th>Total</th><th>Comprobante</th></tr></thead>
        <tbody>{actual.ventas.map(venta => <tr key={venta.id}>
          <td>#{venta.id}</td><td>{new Date(venta.fecha).toLocaleString('es-CL')}</td>
          <td>${venta.total}</td><td><Link to={`/detalle-compra/${venta.id}`}>Ver detalle</Link></td>
        </tr>)}</tbody>
      </Table>}
  </Container>;
}
