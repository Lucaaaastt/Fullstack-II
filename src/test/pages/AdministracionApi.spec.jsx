import '../setupTests';
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ProductosProvider } from '../../context/ProductosContext';
import GestionProductos from '../../pages/GestionProductos';

describe('Administración conectada a la API', () => {
  let datos, peticion, fallo;
  function respuesta(body, status = 200) { return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } }); }
  function abrir() {
    return render(<MemoryRouter initialEntries={['/admin/productos']}><ProductosProvider><Routes>
      <Route path="/admin/productos" element={<GestionProductos />} />
      <Route path="/login" element={<h1>Acceso requerido</h1>} />
    </Routes></ProductosProvider></MemoryRouter>);
  }

  beforeEach(() => {
    localStorage.setItem('usuario', JSON.stringify({ id: 1, nombre: 'Admin', correo: 'admin@ejemplo.test', rol: 'ADMIN' }));
    fallo = '';
    datos = [{ id: 3, nombre: 'Juego original', descripcion: 'Descripción original', precio: 1000, imagenUrl: '/Image/fl4.webp', activo: true, novedad: true }];
    peticion = spyOn(window, 'fetch').and.callFake(async (url, opciones = {}) => {
      const metodo = opciones.method || 'GET';
      if (fallo === metodo) return respuesta({ detail: 'No se pudo guardar el cambio' }, 503);
      if (metodo === 'GET') return respuesta(datos.filter(p => p.activo));
      if (metodo === 'POST') {
        const nuevo = { ...JSON.parse(opciones.body), id: 4 };
        datos.push(nuevo);
        return respuesta(nuevo, 201);
      }
      const producto = datos.find(p => p.id === Number(url.split('/').pop()));
      if (metodo === 'PUT') { Object.assign(producto, JSON.parse(opciones.body)); return respuesta(producto); }
      if (metodo === 'DELETE') { producto.activo = false; return new Response(null, { status: 204 }); }
    });
  });
  afterEach(() => localStorage.removeItem('usuario'));

  function campo(etiqueta, valor) { fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } }); }
  function tarjeta(nombre) { return within(screen.getByRole('heading', { name: nombre }).closest('.card')); }

  it('crea, edita, recupera al recargar y elimina usando el servidor como fuente', async () => {
    const primera = abrir();
    await screen.findByRole('heading', { name: 'Juego original' });
    fireEvent.click(screen.getByRole('button', { name: 'Agregar producto' }));
    campo('Nombre', 'Nuevo juego'); campo('Descripción', 'Descripción nueva'); campo('Precio', '2000'); campo('Imagen (URL o ruta)', '/Image/red2.png');
    fireEvent.click(screen.getByLabelText('Mostrar en novedades'));
    fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }));
    await screen.findByRole('heading', { name: 'Nuevo juego' });
    const crear = peticion.calls.allArgs().find(([, opciones]) => opciones.method === 'POST');
    expect(crear[0]).toBe('/api/productos');
    expect(JSON.parse(crear[1].body)).toEqual({ nombre: 'Nuevo juego', descripcion: 'Descripción nueva', precio: 2000, imagenUrl: '/Image/red2.png', novedad: true, activo: true });

    fireEvent.click(tarjeta('Nuevo juego').getByRole('button', { name: 'Editar' }));
    campo('Precio', '2500');
    fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }));
    await screen.findByText('$2500');
    const editar = peticion.calls.allArgs().find(([, opciones]) => opciones.method === 'PUT');
    expect(editar[0]).toBe('/api/productos/4');
    expect(JSON.parse(editar[1].body).novedad).toBeTrue();

    primera.unmount(); abrir();
    await screen.findByRole('heading', { name: 'Nuevo juego' });
    expect(screen.getByText('$2500')).toBeTruthy();
    fireEvent.click(tarjeta('Nuevo juego').getByRole('button', { name: 'Eliminar' }));
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Eliminar' }));
    await waitFor(() => { if (screen.queryByRole('heading', { name: 'Nuevo juego' })) throw new Error('Esperando eliminación'); });
    expect(peticion.calls.allArgs().find(([, opciones]) => opciones.method === 'DELETE')[0]).toBe('/api/productos/4');
    expect(datos.find(p => p.id === 4).activo).toBeFalse();
  });

  it('mantiene el producto y el formulario si falla la edición', async () => {
    abrir(); await screen.findByRole('heading', { name: 'Juego original' });
    fallo = 'PUT';
    fireEvent.click(tarjeta('Juego original').getByRole('button', { name: 'Editar' }));
    campo('Precio', '2500'); fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }));
    await screen.findByText('No se pudo guardar el cambio');
    expect(screen.getByLabelText('Precio').value).toBe('2500');
    expect(screen.getByText('$1000')).toBeTruthy();
    expect(datos[0].precio).toBe(1000);
  });

  it('no oculta un producto si el servidor rechaza eliminarlo', async () => {
    abrir(); await screen.findByRole('heading', { name: 'Juego original' });
    fallo = 'DELETE';
    fireEvent.click(tarjeta('Juego original').getByRole('button', { name: 'Eliminar' }));
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Eliminar' }));
    await screen.findByText('No se pudo guardar el cambio');
    expect(screen.getByRole('heading', { name: 'Juego original' })).toBeTruthy();
    expect(datos[0].activo).toBeTrue();
  });

  it('valida los campos antes de crear un producto', async () => {
    abrir(); await screen.findByRole('heading', { name: 'Juego original' });
    fireEvent.click(screen.getByRole('button', { name: 'Agregar producto' }));
    fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }));
    expect(screen.getByText('Ingresa un nombre de hasta 150 caracteres.')).toBeTruthy();
    expect(peticion.calls.allArgs().some(([, opciones]) => opciones.method === 'POST')).toBeFalse();
  });

  it('redirige a una cuenta cliente sin mostrar acciones de administración', () => {
    localStorage.setItem('usuario', JSON.stringify({ id: 7, nombre: 'Cliente', correo: 'cliente@ejemplo.test', rol: 'CLIENTE' }));
    abrir();
    expect(screen.getByText('Acceso requerido')).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Agregar producto' })).toBeNull();
  });
});
