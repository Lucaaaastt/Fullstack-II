import '../../setupTests';
import { render, screen, fireEvent } from '@testing-library/react';
import { ItemCarro } from '../../../components/molecules/ItemCarro';

const producto = { id: 5, name: 'Juego de prueba', price: 1200, quantity: 3, image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' };

describe('Molecula ItemCarro', () => {
  it('ICA-01: muestra los datos y el subtotal del producto', () => {
    // Reviso el producto y el subtotal de precio por cantidad.
    render(<ItemCarro item={producto} />);
    expect(screen.getByText('Juego de prueba')).toBeTruthy();
    expect(screen.getByText('$1200')).toBeTruthy();
    expect(screen.getByText('3')).toBeTruthy();
    expect(screen.getByText('$3600')).toBeTruthy();
    expect(screen.getByRole('img', { name: 'Juego de prueba' }).getAttribute('src')).toBe(producto.image);
  });

  it('ICA-02: pasa el id al aumentar o disminuir', () => {
    // Los botones deben avisar que producto quiero modificar.
    const aumentar = jasmine.createSpy('aumentar');
    const disminuir = jasmine.createSpy('disminuir');
    render(<ItemCarro item={producto} onIncrease={aumentar} onDecrease={disminuir} />);
    fireEvent.click(screen.getByRole('button', { name: '+' }));
    fireEvent.click(screen.getByRole('button', { name: '-' }));
    expect(aumentar).toHaveBeenCalledOnceWith(5);
    expect(disminuir).toHaveBeenCalledOnceWith(5);
  });

  it('ICA-03: pasa el id al eliminar el producto', () => {
    // Compruebo que la X llame a la funcion de eliminar.
    const eliminar = jasmine.createSpy('eliminar');
    render(<ItemCarro item={producto} onRemove={eliminar} />);
    fireEvent.click(screen.getByRole('button', { name: 'X' }));
    expect(eliminar).toHaveBeenCalledOnceWith(5);
  });
});

