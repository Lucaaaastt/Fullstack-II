import '../../setupTests';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ListaCarro } from '../../../components/organisms/ListaCarro';

describe('Organismo ListaCarro', () => {
  let mockOnIncrease;
  let mockOnDecrease;
  let mockOnRemove;

  const itemsPrueba = [
    {
      id: 1,
      name: 'Red Dead Redemption 2',
      description: 'Arthur Morgan y la banda de Van der Linde se ven obligados a huir.',
      price: 53990,
      image: '/Image/red2.png',
      cantidad: 1,
      quantity: 1
    },
    {
      id: 2,
      name: 'Ghost Of Tsushima: Directors Cut',
      description: 'Una tormenta se avecina.',
      price: 42000,
      image: '/Image/gotc.png',
      cantidad: 2,
      quantity: 2
    }
  ];

  beforeEach(() => {
    mockOnIncrease = jasmine.createSpy('onIncrease');
    mockOnDecrease = jasmine.createSpy('onDecrease');
    mockOnRemove = jasmine.createSpy('onRemove');
  });

  it('LIS-01: muestra el mensaje "CARRO VACIO" cuando la lista esta vacia o no definida', () => {
    const { rerender } = render(
      <ListaCarro
        items={[]}
        onIncrease={mockOnIncrease}
        onDecrease={mockOnDecrease}
        onRemove={mockOnRemove}
      />
    );

    expect(screen.getByText('CARRO VACIO')).toBeTruthy();

    rerender(
      <ListaCarro
        items={null}
        onIncrease={mockOnIncrease}
        onDecrease={mockOnDecrease}
        onRemove={mockOnRemove}
      />
    );

    expect(screen.getByText('CARRO VACIO')).toBeTruthy();
  });

  it('LIS-02: renderiza los productos del carrito recibidos', () => {
    render(
      <ListaCarro
        items={itemsPrueba}
        onIncrease={mockOnIncrease}
        onDecrease={mockOnDecrease}
        onRemove={mockOnRemove}
      />
    );

    expect(screen.getByText('Red Dead Redemption 2')).toBeTruthy();
    expect(screen.getByText('Ghost Of Tsushima: Directors Cut')).toBeTruthy();
  });

  it('LIS-03: transmite correctamente las funciones de callbacks a los elementos de la lista', () => {
    render(
      <ListaCarro
        items={itemsPrueba}
        onIncrease={mockOnIncrease}
        onDecrease={mockOnDecrease}
        onRemove={mockOnRemove}
      />
    );

    const botonesIncrementar = screen.getAllByRole('button', { name: '+' });
    fireEvent.click(botonesIncrementar[0]);

    expect(mockOnIncrease).toHaveBeenCalledWith(1);
  });
});