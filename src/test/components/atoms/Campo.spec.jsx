import '../../setupTests';
import { render, screen, fireEvent } from '@testing-library/react';
import { Campo } from '../../../components/atoms/Campo';

describe('Atomo Campo', () => {
  it('CAM-01: conecta la etiqueta con el campo y usa texto por defecto', () => {
    // Busco el campo por su etiqueta para comprobar que estan conectados.
    render(<Campo id="nombre-prueba" nombre="nombre" etiqueta="Nombre" />);
    const campo = screen.getByLabelText('Nombre');
    expect(campo.id).toBe('nombre-prueba');
    expect(campo.name).toBe('nombre');
    expect(campo.type).toBe('text');
  });

  it('CAM-02: aplica el tipo y el autocompletado recibidos', () => {
    // Reviso que el campo se pueda configurar para una clave nueva.
    render(<Campo id="clave-prueba" nombre="clave" etiqueta="Clave" tipo="password" autoComplete="new-password" />);
    const campo = screen.getByLabelText('Clave');
    expect(campo.type).toBe('password');
    expect(campo.autocomplete).toBe('new-password');
  });

  it('CAM-03: permite escribir en el campo', () => {
    // Simulo que el usuario escribe su nombre.
    render(<Campo id="nombre-prueba" nombre="nombre" etiqueta="Nombre" />);
    const campo = screen.getByLabelText('Nombre');
    fireEvent.change(campo, { target: { value: 'Lucas' } });
    expect(campo.value).toBe('Lucas');
  });
});
