import '../../setupTests';

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../../../components/organisms/ProductCard';
import { CartProvider } from '../../../context/CartContext';

describe('Organismo ProductCard', () => {
  beforeEach(() => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('jdr-carrito-7');
  });
  afterEach(() => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('jdr-carrito-7');
  });
  const productoPrueba = {
    id: 1,
    name: 'Red Dead Redemption 2',
    price: 53990,
    image: '/Image/red2.png'
  };

  const renderComponent = (prod = productoPrueba) =>
    render(
      <MemoryRouter>
        <CartProvider>
          <ProductCard product={prod} />
        </CartProvider>
      </MemoryRouter>
    );

  it('PC-01: no renderiza nada si no se le proporciona un producto', () => {
    const { container } = renderComponent(null);
    expect(container.firstChild).toBeNull();
  });

  it('PC-02: renderiza la informacion del producto correctamente', () => {
    renderComponent();

    expect(screen.getByText('Red Dead Redemption 2')).toBeTruthy();
    expect(screen.getByRole('button', { name: /ver detalles/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /agregar a carro/i })).toBeTruthy();
  });

  it('PC-03: agrega el producto al carrito del usuario que inició sesión', () => {
    localStorage.setItem('usuario', JSON.stringify({
      id: 7, nombre: 'Cliente', correo: 'cliente@gmail.com', rol: 'CLIENTE'
    }));
    renderComponent();

    const botonAgregar = screen.getByRole('button', { name: /agregar a carro/i });
    fireEvent.click(botonAgregar);

    expect(screen.getByRole('dialog')).toBeTruthy();
    expect(screen.getByText('PRODUCTO AÑADIDO!')).toBeTruthy();
    expect(screen.getByRole('button', { name: /seguir comprando/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /ir a pagar/i })).toBeTruthy();
    expect(JSON.parse(localStorage.getItem('jdr-carrito-7'))[0].id).toBe(1);
  });
});
