import '../setupTests';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Aplicacion from '../../Aplicacion';

describe('Recorrido completo de la tienda con API simulada', () => {
  beforeEach(() => {
    localStorage.removeItem('usuario'); localStorage.removeItem('jdr-carrito-7'); localStorage.removeItem('jdr-carrito');
  });
  afterEach(() => {
    localStorage.removeItem('usuario'); localStorage.removeItem('jdr-carrito-7'); localStorage.removeItem('jdr-carrito');
  });

  it('registra, inicia sesión, compra y recupera el importe confirmado desde historial y URL', async () => {
    const usuario = { id: 7, nombre: 'Cliente', correo: 'cliente@gmail.com', rol: 'CLIENTE' };
    let credenciales, venta;
    const producto = { id: 3, nombre: 'Juego de prueba', descripcion: 'Descripción', precio: 1000, imagenUrl: '/Image/red2.png', activo: true, novedad: false };
    function responder(datos, status = 200) { return new Response(JSON.stringify(datos), { status, headers: { 'Content-Type': 'application/json' } }); }
    spyOn(window, 'fetch').and.callFake(async (url, opciones = {}) => {
      if (url === '/api/productos') return responder([producto]);
      if (url === '/api/usuarios') { credenciales = JSON.parse(opciones.body); return responder(usuario, 201); }
      if (url === '/api/usuarios/login') {
        const datos = JSON.parse(opciones.body);
        return datos.correo === credenciales.correo && datos.contrasena === credenciales.contrasena
          ? responder(usuario) : responder({ detail: 'Credenciales incorrectas' }, 401);
      }
      if (url === '/api/ventas' && opciones.method === 'POST') {
        const datos = JSON.parse(opciones.body);
        expect(datos.usuarioId).toBe(7);
        expect(datos.detalles).toEqual([{ productoId: 3, cantidad: 1 }]);
        venta = { id: 100, usuarioId: 7, fecha: '2026-11-23T12:00:00Z', total: 1500,
          detalles: [{ id: 1, productoId: 3, nombreProducto: producto.nombre, cantidad: 1, precioUnitario: 1500 }] };
        return responder(venta, 201);
      }
      if (url === '/api/ventas/100') return responder(venta);
      if (url === '/api/ventas?usuarioId=7') return responder([venta]);
      throw new Error(`Solicitud inesperada: ${url}`);
    });

    const primera = render(<MemoryRouter><Aplicacion /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }));
    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));
    const rellenar = (etiqueta, valor) => fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });
    rellenar('Nombre', 'Cliente'); rellenar('Correo', 'cliente@gmail.com');
    rellenar('Contraseña', 'clave-prueba'); rellenar('Confirmar contraseña', 'clave-prueba');
    fireEvent.submit(screen.getByLabelText('Nombre').closest('form'));
    await screen.findByText('Hola, Cliente');

    fireEvent.click(screen.getByRole('button', { name: 'Cerrar sesión' }));
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }));
    rellenar('Correo', 'cliente@gmail.com'); rellenar('Contraseña', 'clave-prueba');
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));
    await screen.findByText('Hola, Cliente');
    fireEvent.click(screen.getByRole('link', { name: 'Catalogo' }));
    await screen.findByRole('heading', { name: 'Juego de prueba' });
    fireEvent.click(screen.getByRole('button', { name: 'Agregar a Carro' }));
    fireEvent.click(screen.getByRole('button', { name: 'IR A PAGAR' }));
    fireEvent.click(screen.getByRole('button', { name: 'Proceder al Pago' }));
    await screen.findByText('Total registrado: $1500');
    expect(JSON.parse(localStorage.getItem('jdr-carrito-7'))).toEqual([]);
    expect(screen.getAllByText('$1500').length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole('link', { name: 'Mis compras' }));
    await screen.findByText('#100');
    fireEvent.click(screen.getByRole('link', { name: 'Ver detalle' }));
    await screen.findByText('Total registrado: $1500');
    primera.unmount();
    render(<MemoryRouter initialEntries={['/detalle-compra/100']}><Aplicacion /></MemoryRouter>);
    expect(await screen.findByText('Total registrado: $1500')).toBeTruthy();
  });
});
