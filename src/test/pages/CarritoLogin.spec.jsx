import '../setupTests';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from '../../context/CartContext';
import ProductCard from '../../components/organisms/ProductCard';
import DetalleProducto from '../../pages/DetalleProducto';
import Carro from '../../pages/Carro';

describe('Carrito con usuario identificado', () => {
  const producto = { id: 1, name: 'Juego de prueba', price: 1000, image: '/Image/red2.png', quantity: 2 };
  const cliente = { id: 7, nombre: 'Cliente', correo: 'cliente@gmail.com', rol: 'CLIENTE' };

  beforeEach(() => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('jdr-carrito');
    localStorage.removeItem('jdr-carrito-7');
  });

  afterEach(() => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('jdr-carrito');
    localStorage.removeItem('jdr-carrito-7');
  });

  function abrir(ruta, elemento) {
    return render(<MemoryRouter initialEntries={[ruta]}><CartProvider><Routes>
      <Route path="/" element={elemento} />
      <Route path="/productos/:id" element={<DetalleProducto />} />
      <Route path="/carro" element={<Carro />} />
      <Route path="/login" element={<h1>Acceso requerido</h1>} />
      <Route path="/detalle-compra/:id" element={<h1>Venta registrada</h1>} />
    </Routes></CartProvider></MemoryRouter>);
  }

  it('envía al login desde una tarjeta sin agregar productos como invitado', () => {
    abrir('/', <ProductCard product={producto} />);
    fireEvent.click(screen.getByRole('button', { name: /agregar a carro/i }));

    expect(screen.getByRole('heading', { name: 'Acceso requerido' })).toBeTruthy();
    expect(JSON.parse(localStorage.getItem('jdr-carrito'))).toEqual([]);
  });

  it('envía al login desde el detalle sin agregar productos como invitado', () => {
    abrir('/productos/1');
    fireEvent.click(screen.getByRole('button', { name: /agregar a carro/i }));

    expect(screen.getByRole('heading', { name: 'Acceso requerido' })).toBeTruthy();
    expect(JSON.parse(localStorage.getItem('jdr-carrito'))).toEqual([]);
  });

  it('protege el acceso directo al carrito sin enviar solicitudes de venta', () => {
    const peticion = spyOn(window, 'fetch');
    abrir('/carro');

    expect(screen.getByRole('heading', { name: 'Acceso requerido' })).toBeTruthy();
    expect(peticion).not.toHaveBeenCalled();
  });

  it('registra la compra con el ID real del usuario y vacía solo su carrito', async () => {
    localStorage.setItem('usuario', JSON.stringify(cliente));
    localStorage.setItem('jdr-carrito-7', JSON.stringify([producto]));
    localStorage.setItem('jdr-carrito', JSON.stringify([{ ...producto, id: 2 }]));
    const peticion = spyOn(window, 'fetch').and.resolveTo(new Response(JSON.stringify({
      id: 100, usuarioId: 7, fecha: '2026-11-23T12:00:00Z', total: 2000, detalles: []
    }), { status: 201 }));
    spyOn(window, 'alert');
    abrir('/carro');
    fireEvent.click(screen.getByRole('button', { name: 'Proceder al Pago' }));

    expect(await screen.findByRole('heading', { name: 'Venta registrada' })).toBeTruthy();
    const [url, opciones] = peticion.calls.mostRecent().args;
    expect(url).toBe('/api/ventas');
    expect(JSON.parse(opciones.body)).toEqual({ usuarioId: 7, detalles: [{ productoId: 1, cantidad: 2 }] });
    expect(JSON.parse(localStorage.getItem('jdr-carrito-7'))).toEqual([]);
    expect(JSON.parse(localStorage.getItem('jdr-carrito'))[0].id).toBe(2);
  });

  it('conserva el carrito si el backend rechaza la venta', async () => {
    localStorage.setItem('usuario', JSON.stringify(cliente));
    localStorage.setItem('jdr-carrito-7', JSON.stringify([producto]));
    spyOn(window, 'fetch').and.resolveTo(new Response(JSON.stringify({ detail: 'Producto no disponible' }), { status: 404 }));
    abrir('/carro');
    fireEvent.click(screen.getByRole('button', { name: 'Proceder al Pago' }));

    expect(await screen.findByRole('alert')).toBeTruthy();
    expect(screen.getByText('Producto no disponible')).toBeTruthy();
    expect(JSON.parse(localStorage.getItem('jdr-carrito-7'))).toEqual([producto]);
  });

  it('bloquea el formulario mientras registra una compra', async () => {
    localStorage.setItem('usuario', JSON.stringify(cliente));
    localStorage.setItem('jdr-carrito-7', JSON.stringify([producto]));
    let resolver;
    const peticion = spyOn(window, 'fetch').and.returnValue(new Promise(resolve => { resolver = resolve; }));
    abrir('/carro');
    fireEvent.click(screen.getByRole('button', { name: 'Proceder al Pago' }));
    expect(screen.getByRole('button', { name: 'Registrando compra...' }).disabled).toBeTrue();
    expect(screen.getByRole('button', { name: 'Vaciar Carro' }).disabled).toBeTrue();
    expect(peticion.calls.count()).toBe(1);
    resolver(new Response(JSON.stringify({ detail: 'Intenta nuevamente' }), { status: 503 }));
    await screen.findByText('Intenta nuevamente');
    await waitFor(() => { if (screen.getByRole('button', { name: 'Proceder al Pago' }).disabled) throw new Error('Esperando formulario'); });
  });

  it('no vacía el carrito si la respuesta exitosa no incluye una venta válida', async () => {
    localStorage.setItem('usuario', JSON.stringify(cliente));
    localStorage.setItem('jdr-carrito-7', JSON.stringify([producto]));
    spyOn(window, 'fetch').and.resolveTo(new Response('{}', { status: 200 }));
    abrir('/carro');
    fireEvent.click(screen.getByRole('button', { name: 'Proceder al Pago' }));
    await screen.findByText('El servidor no devolvió una venta válida.');
    expect(JSON.parse(localStorage.getItem('jdr-carrito-7'))).toEqual([producto]);
  });
});
