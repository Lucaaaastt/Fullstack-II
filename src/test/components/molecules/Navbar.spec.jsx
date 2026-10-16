import '../../setupTests';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '../../../components/molecules/Navbar';

describe('Molecula Navbar', () => {
  it('NAV-01: muestra los enlaces recibidos y sus iconos', () => {
    // Reviso que se dibuje cada opcion del menu.
    const items = [
      { id: 'inicio', text: 'Inicio', href: '/', icon: <span data-testid="icono-inicio">*</span> },
      { id: 'catalogo', text: 'Catalogo', href: '/productos', className: 'enlace-prueba' },
    ];
    render(<MemoryRouter><Navbar items={items} /></MemoryRouter>);
    expect(within(screen.getByRole('navigation')).getAllByRole('link').length).toBe(2);
    expect(screen.getByRole('link', { name: 'Inicio' }).getAttribute('href')).toBe('/');
    expect(screen.getByTestId('icono-inicio')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Catalogo' }).className).toContain('enlace-prueba');
  });

  it('NAV-02: navega al destino al hacer clic', () => {
    // Simulo el clic y compruebo la pagina que se abre.
    render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar items={[{ id: 'catalogo', text: 'Catalogo', href: '/productos' }]} />
        <Routes>
          <Route path="/" element={<p>Pagina inicial</p>} />
          <Route path="/productos" element={<h1>Pagina del catalogo</h1>} />
        </Routes>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('link', { name: 'Catalogo' }));
    expect(screen.getByRole('heading', { name: 'Pagina del catalogo' })).toBeTruthy();
    expect(screen.queryByText('Pagina inicial')).toBeNull();
  });

  it('NAV-03: funciona sin una lista de enlaces', () => {
    // El menu queda vacio si no se le pasan opciones.
    render(<MemoryRouter><Navbar /></MemoryRouter>);
    expect(screen.getByRole('navigation')).toBeTruthy();
    expect(within(screen.getByRole('navigation')).queryAllByRole('link').length).toBe(0);
  });
});

