import '../setupTests';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import DetalleCompra from '../../pages/DetalleCompra';
import HistorialCompras from '../../pages/HistorialCompras';

describe('Comprobantes e historial de compras', () => {
  const cliente = { id: 7, nombre: 'Cliente', correo: 'cliente@gmail.com', rol: 'CLIENTE' };
  const venta = { id: 100, usuarioId: 7, fecha: '2026-11-23T12:00:00Z', total: 1400,
    detalles: [{ id: 1, productoId: 3, nombreProducto: 'Juego confirmado', cantidad: 2, precioUnitario: 700 }] };

  beforeEach(() => localStorage.setItem('usuario', JSON.stringify(cliente)));
  afterEach(() => localStorage.removeItem('usuario'));
  function respuesta(datos, status = 200) { return new Response(JSON.stringify(datos), { status }); }
  function abrir(ruta = '/detalle-compra/100') {
    return render(<MemoryRouter initialEntries={[ruta]}><Routes>
      <Route path="/detalle-compra/:id" element={<DetalleCompra />} />
      <Route path="/mis-compras" element={<HistorialCompras />} />
      <Route path="/login" element={<h1>Acceso requerido</h1>} />
    </Routes></MemoryRouter>);
  }

  it('consulta por URL y muestra precios, total y fecha confirmados por el backend', async () => {
    const peticion = spyOn(window, 'fetch').and.resolveTo(respuesta(venta));
    abrir();
    expect(await screen.findByText('Juego confirmado')).toBeTruthy();
    expect(screen.getByText('$700')).toBeTruthy();
    expect(screen.getByText('Total registrado: $1400')).toBeTruthy();
    expect(screen.getByText(new RegExp('Orden #100'))).toBeTruthy();
    expect(peticion.calls.mostRecent().args[0]).toBe('/api/ventas/100');
    expect(screen.queryByText(/Pagado/)).toBeNull();
  });

  it('recupera la compra al volver a abrir la URL sin estado de navegación', async () => {
    const peticion = spyOn(window, 'fetch').and.callFake(() => Promise.resolve(respuesta(venta)));
    const primera = abrir();
    await screen.findByText('Juego confirmado');
    primera.unmount();
    abrir();
    await screen.findByText('Juego confirmado');
    expect(peticion.calls.count()).toBe(2);
  });

  it('no muestra un comprobante perteneciente a otra cuenta', async () => {
    spyOn(window, 'fetch').and.resolveTo(respuesta({ ...venta, usuarioId: 9 }));
    abrir();
    await screen.findByText('Esta compra no corresponde a tu cuenta.');
    expect(screen.queryByText('Juego confirmado')).toBeNull();
  });

  it('muestra el error de una compra inexistente', async () => {
    spyOn(window, 'fetch').and.resolveTo(respuesta({ detail: 'Venta no encontrada' }, 404));
    abrir();
    expect(await screen.findByText('Venta no encontrada')).toBeTruthy();
  });

  it('pide login antes de consultar una compra', () => {
    localStorage.removeItem('usuario');
    const peticion = spyOn(window, 'fetch');
    abrir();
    expect(screen.getByText('Acceso requerido')).toBeTruthy();
    expect(peticion).not.toHaveBeenCalled();
  });

  it('solicita solo las compras del usuario e incluye el enlace al comprobante', async () => {
    const peticion = spyOn(window, 'fetch').and.resolveTo(respuesta([venta]));
    abrir('/mis-compras');
    expect(await screen.findByText('#100')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Ver detalle' }).getAttribute('href')).toBe('/detalle-compra/100');
    expect(peticion.calls.mostRecent().args[0]).toBe('/api/ventas?usuarioId=7');
  });

  it('explica cuando el usuario aún no tiene compras', async () => {
    spyOn(window, 'fetch').and.resolveTo(respuesta([]));
    abrir('/mis-compras');
    expect(await screen.findByText('Todavía no tienes compras registradas.')).toBeTruthy();
  });

  it('permite reintentar el historial después de un error', async () => {
    const peticion = spyOn(window, 'fetch').and.returnValues(
      Promise.resolve(respuesta({ detail: 'Servicio no disponible' }, 503)),
      Promise.resolve(respuesta([venta])));
    abrir('/mis-compras');
    await screen.findByText('Servicio no disponible');
    fireEvent.click(screen.getByRole('button', { name: 'Reintentar' }));
    await screen.findByText('#100');
    expect(peticion.calls.count()).toBe(2);
  });
});
