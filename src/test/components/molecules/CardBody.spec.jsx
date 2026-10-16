import '../../setupTests';
import { render, screen } from '@testing-library/react';
import CardBody from '../../../components/molecules/CardBody';

describe('Molecula CardBody', () => {
  it('CBO-01: muestra el titulo y el precio recibidos', () => {
    // Reviso los datos principales de la tarjeta.
    render(<CardBody title="Juego de prueba" description="Aventura" price={15000} />);
    expect(screen.getByRole('heading', { name: 'Juego de prueba' })).toBeTruthy();
    expect(screen.getByText('$15000')).toBeTruthy();
  });

  it('CBO-02: muestra la descripcion cuando recibe una', () => {
    // Compruebo que aparezca la descripcion del producto.
    render(<CardBody title="Juego" description="Una aventura nueva" price={1000} />);
    expect(screen.getByText('Una aventura nueva')).toBeTruthy();
  });

  it('CBO-03: no crea un parrafo si no hay descripcion', () => {
    // La tarjeta debe funcionar sin este dato opcional.
    const { container } = render(<CardBody title="Juego" price={0} />);
    expect(container.querySelector('p')).toBeNull();
    expect(screen.getByText('$0')).toBeTruthy();
  });
});
