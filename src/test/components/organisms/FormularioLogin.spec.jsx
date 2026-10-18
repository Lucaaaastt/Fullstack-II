import '../../setupTests';

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

  it('LOG-03: rechaza credenciales incorrectas de administrador', () => {
    // Reviso el aviso actual sin abrir alertas ni iniciar una sesion.
    const aviso = spyOn(window, 'alert');
    render(<FormularioLogin mostrar={true} onCerrar={mockOnCerrar} tipo="admin" />);
    fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: 'usuario@prueba.com' } });
    fireEvent.change(screen.getByLabelText(/Contrase/i), { target: { value: 'incorrecta' } });
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));
    expect(aviso).toHaveBeenCalledOnceWith(jasmine.stringMatching(/incorrectos/));
  });
});
