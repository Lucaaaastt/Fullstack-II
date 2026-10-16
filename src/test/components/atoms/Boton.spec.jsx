import '../../setupTests';
import { render, screen, fireEvent } from '@testing-library/react';
import { Boton } from '../../../components/atoms/Boton';

describe('Componente Boton', () => {
  it('BOT-01: muestra el texto recibido', () => {
    // Dibujo el botón y reviso que aparezca el texto que le pasé.
    render(<Boton>Ingresar</Boton>);

    expect(screen.getByRole('button', { name: 'Ingresar' })).toBeTruthy();
  });

  it('BOT-02: ejecuta la acción una vez al hacer clic', () => {
    // Uso un espía para contar las veces que se llama a la función.
    const accion = jasmine.createSpy('accion');
    render(<Boton onClick={accion}>Ingresar</Boton>);

    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));

    expect(accion).toHaveBeenCalledTimes(1);
  });

  it('BOT-03: no ejecuta la acción si está deshabilitado', () => {
    const accion = jasmine.createSpy('accion');
    render(<Boton disabled onClick={accion}>Ingresar</Boton>);
    const boton = screen.getByRole('button', { name: 'Ingresar' });

    // Reviso que esté deshabilitado y que el clic no ejecute la acción.
    expect(boton.disabled).toBe(true);
    fireEvent.click(boton);

    expect(accion).not.toHaveBeenCalled();
  });
});
