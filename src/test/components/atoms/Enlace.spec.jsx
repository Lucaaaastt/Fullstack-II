import '../../setupTests';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Enlace } from '../../../components/atoms/Enlace';

describe('Atomo Enlace', () => {
  it('ENL-01: muestra el texto, el icono y la clase recibidos', () => {
    // Reviso el contenido visible y los estilos del enlace.
    render(
      <MemoryRouter>
        <Enlace href="/productos" className="enlace-prueba" icon={<span data-testid="icono-enlace">*</span>}>
          Ver catalogo
        </Enlace>
      </MemoryRouter>
    );
    const enlace = screen.getByRole('link', { name: 'Ver catalogo' });
    expect(enlace.getAttribute('href')).toBe('/productos');
    expect(enlace.className).toContain('enlace-prueba');
    expect(screen.getByTestId('icono-enlace').parentElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('ENL-02: navega a una pagina interna al hacer clic', () => {
    // Uso un router en memoria para comprobar el cambio de pagina.
    render(
      <MemoryRouter initialEntries={['/']}>
        <Enlace href="/productos">Ir a productos</Enlace>
        <Routes>
          <Route path="/" element={<p>Inicio de prueba</p>} />
          <Route path="/productos" element={<h1>Productos de prueba</h1>} />
        </Routes>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('link', { name: 'Ir a productos' }));
    expect(screen.getByRole('heading', { name: 'Productos de prueba' })).toBeTruthy();
    expect(screen.queryByText('Inicio de prueba')).toBeNull();
  });

  it('ENL-03: conserva la URL y los atributos de un enlace externo', () => {
    // Un destino externo debe funcionar sin necesitar el router.
    render(<Enlace href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub de prueba</Enlace>);
    const enlace = screen.getByRole('link', { name: 'GitHub de prueba' });
    expect(enlace.getAttribute('href')).toBe('https://github.com');
    expect(enlace.target).toBe('_blank');
    expect(enlace.rel).toBe('noopener noreferrer');
  });
});
