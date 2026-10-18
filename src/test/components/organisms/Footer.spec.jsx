import '../../setupTests';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from '../../../components/organisms/Footer';

describe('Organismo Footer', () => {
  it('FOO-01: muestra el titulo principal de la tienda y la descripcion', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    // Verificamos el titulo de la marca
    expect(screen.getByText('TIENDA JDR')).toBeTruthy();
    // Verificamos el eslogan o descripcio
    expect(screen.getByText('Tu tienda de videojuegos.')).toBeTruthy();
  });

  it('FOO-02: muestra el texto de derechos reservados con el año actual', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const year = new Date().getFullYear();
    const copyrightText = screen.getByText(
      new RegExp(`© ${year} Tienda JDR. Todos los derechos reservados.`, 'i')
    );

    expect(copyrightText).toBeTruthy();
  });

  it('FOO-03: renderiza los componentes moleculares hijos (ContactInfo y FooterLinks)', () => {
    const mockItems = [
      { text: 'Inicio', path: '/' },
      { text: 'Productos', path: '/productos' }
    ];

    render(
      <MemoryRouter>
        <Footer items={mockItems} />
      </MemoryRouter>
    );

    // Verificamos que los enlaces pasados a FooterLinks se rendericen correctamente
    expect(screen.getByText('Inicio')).toBeTruthy();
    expect(screen.getByText('Productos')).toBeTruthy();
  });
});
