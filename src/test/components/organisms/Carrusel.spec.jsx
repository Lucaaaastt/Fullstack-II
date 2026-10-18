import '../../setupTests';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Carrusel } from '../../../components/organisms/Carrusel';

describe('Organismo Carrusel', () => {
  it('CAR-01: muestra el titulo y precio del primer juego de novedades', () => {
    render(
      <MemoryRouter>
        <Carrusel />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Cyberpunk 2077' })).toBeTruthy();
    expect(screen.getByText('$39990')).toBeTruthy();
  });

  it('CAR-02: renderiza los botones de "VER PRODUCTO" para cada juego', () => {
    render(
      <MemoryRouter>
        <Carrusel />
      </MemoryRouter>
    );

    const botonesVerProducto = screen.getAllByRole('button', { name: /ver producto/i });
    expect(botonesVerProducto.length).toBe(3);
  });

  it('CAR-03: navega al detalle del producto correcto al hacer clic en el boton', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Carrusel />} />
          <Route path="/productos/:id" element={<h1>Pagina Detalle Producto</h1>} />
        </Routes>
      </MemoryRouter>
    );

    const botonesVerProducto = screen.getAllByRole('button', { name: /ver producto/i });
    
    // Hacemos clic en el primer botón (Cyberpunk 2077 -> id: 11)
    fireEvent.click(botonesVerProducto[0]);

    // Verificamos que se haya navegado a la pantalla de detalle del producto
    expect(screen.getByText('Pagina Detalle Producto')).toBeTruthy();
  });
});