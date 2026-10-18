import '../../setupTests';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormularioLogin } from '../../../components/organisms/FormularioLogin';

describe('Organismo FormularioLogin', () => {
  let mockOnCerrar;

  beforeEach(() => {
    mockOnCerrar = jasmine.createSpy('onCerrar');
  });

  it('LOG-01: muestra el titulo y los campos de entrada obligatorios cuando mostrar es true', () => {
    render(<FormularioLogin mostrar={true} onCerrar={mockOnCerrar} />);

    expect(screen.getByText('Iniciar sesión')).toBeTruthy();
    expect(screen.getByLabelText(/correo/i)).toBeTruthy();
    expect(screen.getByLabelText(/contraseña/i)).toBeTruthy();
  });

  it('LOG-02: ejecuta la funcion onCerrar al hacer clic en el boton de cerrar', () => {
    render(<FormularioLogin mostrar={true} onCerrar={mockOnCerrar} />);

    const botonesCerrar = screen.getAllByRole('button', { name: /cerrar/i });
    fireEvent.click(botonesCerrar[0]);

    expect(mockOnCerrar).toHaveBeenCalledTimes(1);
  });

  it('LOG-03: muestra el mensaje de confirmacion al enviar el formulario', () => {
    render(<FormularioLogin mostrar={true} onCerrar={mockOnCerrar} />);

    // Llenamos los campos para satisfacer la propiedad 'required'
    const inputCorreo = screen.getByLabelText(/correo/i);
    const inputContrasena = screen.getByLabelText(/contraseña/i);

    fireEvent.change(inputCorreo, { target: { value: 'usuario@prueba.com' } });
    fireEvent.change(inputContrasena, { target: { value: '123456' } });

    // Hacemos clic en Ingresar
    const botonIngresar = screen.getByRole('button', { name: 'Ingresar' });
    fireEvent.click(botonIngresar);

    expect(
      screen.getByText('El formulario está listo. La comprobación de usuarios aún está pendiente.')
    ).toBeTruthy();
  });
});