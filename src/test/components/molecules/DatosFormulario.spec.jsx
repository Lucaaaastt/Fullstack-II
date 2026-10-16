import '../../setupTests';
import { render, screen, fireEvent } from '@testing-library/react';
import { DatosFormulario } from '../../../components/molecules/DatosFormulario';

describe('Molecula DatosFormulario', () => {
  it('DFO-01: login muestra correo y clave, pero no nombre', () => {
    // Sin registro solo deben aparecer los dos campos del login.
    render(<DatosFormulario />);
    expect(screen.queryByLabelText('Nombre')).toBeNull();
    expect(screen.getByLabelText('Correo').type).toBe('email');
    const clave = screen.getByLabelText(/Contrase/);
    expect(clave.type).toBe('password');
    expect(clave.autocomplete).toBe('current-password');
  });

  it('DFO-02: registro agrega nombre y pide una clave nueva', () => {
    // Reviso lo que cambia cuando abro el registro.
    render(<DatosFormulario registro />);
    expect(screen.getByLabelText('Nombre')).toBeTruthy();
    expect(screen.getByLabelText('Correo')).toBeTruthy();
    expect(screen.getByLabelText(/Contrase/).autocomplete).toBe('new-password');
  });

  it('DFO-03: permite escribir en los campos', () => {
    // Simulo que el usuario completa el registro.
    render(<DatosFormulario registro />);
    const nombre = screen.getByLabelText('Nombre');
    const correo = screen.getByLabelText('Correo');
    const clave = screen.getByLabelText(/Contrase/);
    fireEvent.change(nombre, { target: { value: 'Lucas' } });
    fireEvent.change(correo, { target: { value: 'lucas@gmail.com' } });
    fireEvent.change(clave, { target: { value: 'clave-prueba' } });
    expect(nombre.value).toBe('Lucas');
    expect(correo.value).toBe('lucas@gmail.com');
    expect(clave.value).toBe('clave-prueba');
  });
});
