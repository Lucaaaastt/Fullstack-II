import '../../setupTests';
import { render, screen } from '@testing-library/react';
import { ContactInfo } from '../../../components/molecules/ContactInfo';

describe('Molecula ContactInfo', () => {
  it('CON-01: muestra el titulo Contacto', () => {
    // Reviso que el bloque tenga su titulo.
    render(<ContactInfo />);
    expect(screen.getByRole('heading', { name: 'Contacto', level: 2 })).toBeTruthy();
  });

  it('CON-02: muestra la direccion y el telefono', () => {
    // Compruebo que los datos de contacto esten visibles.
    render(<ContactInfo />);
    expect(screen.getByText(/Cerro Papa 324/)).toBeTruthy();
    expect(screen.getByText(/\+56 9 1234 5678/)).toBeTruthy();
  });

  it('CON-03: muestra la institucion', () => {
    // Reviso que aparezca el nombre de DUOC UC.
    render(<ContactInfo />);
    expect(screen.getByText('DUOC UC')).toBeTruthy();
  });
});
