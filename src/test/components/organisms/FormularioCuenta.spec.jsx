import '../../setupTests';

import { render, screen, fireEvent } from '@testing-library/react';
import { FormularioCuenta } from '../../../components/organisms/FormularioCuenta';

describe('Organismo FormularioCuenta', () => {
  let mockOnCerrar;

  beforeEach(() => {
    mockOnCerrar = jasmine.createSpy('onCerrar');
  });

  it('FOR-01: muestra el titulo correcto de acuerdo al tipo ("login" o "registro")', () => {
    const { rerender } = render(<FormularioCuenta tipo="registro" onCerrar={mockOnCerrar} />);
    
    // Filtramos para obtener el registrarse 
    const titulosRegistro = screen.getAllByText('Registrarse');
    expect(titulosRegistro.length).toBeGreaterThan(0);

    rerender(<FormularioCuenta tipo="login" onCerrar={mockOnCerrar} />);
    expect(screen.getByText('Iniciar sesión')).toBeTruthy();
  });

  it('FOR-02: llama a la funcion onCerrar al hacer clic en el boton de cerrar', () => {
    render(<FormularioCuenta tipo="registro" onCerrar={mockOnCerrar} />);

    // Buscamos todos los botones que contienen "Cerrar" y hacemos clic en el de la accion
    const botonesCerrar = screen.getAllByRole('button', { name: /cerrar/i });
    fireEvent.click(botonesCerrar[0]);

    expect(mockOnCerrar).toHaveBeenCalledTimes(1);
  });

  it('FOR-03: ejecuta la validacion y actualiza el estado de respuesta al enviar el formulario', () => {
    render(<FormularioCuenta tipo="login" onCerrar={mockOnCerrar} />);

    // Hacemos clic en el boton de ingresar
    const botonIngresar = screen.getByRole('button', { name: 'Ingresar' });
    fireEvent.click(botonIngresar);

    // Verificamos que el elemento de estado este presente
    expect(screen.getByRole('status')).toBeTruthy();
  });
});
