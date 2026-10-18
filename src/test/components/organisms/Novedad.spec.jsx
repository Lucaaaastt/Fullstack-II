import '../../setupTests';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Novedades } from '../../../components/organisms/Novedad';
import { CartProvider } from '../../../context/CartContext';

describe('Organismo Novedades', () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <CartProvider>
          <Novedades />
        </CartProvider>
      </MemoryRouter>
    );

  it('NOV-01: muestra el titulo de la seccion "NOVEDADES"', () => {
    renderComponent();

    expect(screen.getByText('NOVEDADES')).toBeTruthy();
  });

  it('NOV-02: renderiza las tarjetas de los productos destacados en novedad', () => {
    renderComponent();

    expect(screen.getByText('Cyberpunk 2077')).toBeTruthy();
    expect(screen.getByText('Kingdom Come: Deliverance II')).toBeTruthy();
    expect(screen.getByText('Gears of War: E-Day')).toBeTruthy();
  });

  it('NOV-03: renderiza la cantidad de productos en el listado de novedades', () => {
    renderComponent();

    // Verificamos que se rendericen
    const tarjetas = screen.getAllByRole('button', { name: /ver detalles/i });
    expect(tarjetas.length).toBe(3);
  });
});
