import '../../setupTests';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FooterLinks } from '../../../components/molecules/FooterLinks';

describe('Molecula FooterLinks', () => {
  it('FOL-01: muestra los enlaces internos con sus destinos', () => {
    // Paso dos enlaces y reviso sus nombres y rutas.
    const items = [
      { id: 'inicio', text: 'Inicio', href: '/' },
      { id: 'nosotros', text: 'Nosotros', href: '/sobre-nosotros' },
    ];
    render(<MemoryRouter><FooterLinks items={items} /></MemoryRouter>);
    expect(within(screen.getByRole('navigation')).getAllByRole('link').length).toBe(2);
    expect(screen.getByRole('link', { name: 'Inicio' }).getAttribute('href')).toBe('/');
    expect(screen.getByRole('link', { name: 'Nosotros' }).getAttribute('href')).toBe('/sobre-nosotros');
  });

  it('FOL-02: conserva los atributos de un enlace externo', () => {
    // Reviso la URL y la apertura en otra ventana.
    const items = [{ id: 'github', text: 'GitHub', href: 'https://github.com', target: '_blank', rel: 'noopener noreferrer' }];
    render(<MemoryRouter><FooterLinks items={items} /></MemoryRouter>);
    const enlace = screen.getByRole('link', { name: 'GitHub' });
    expect(enlace.getAttribute('href')).toBe('https://github.com');
    expect(enlace.target).toBe('_blank');
    expect(enlace.rel).toBe('noopener noreferrer');
  });

  it('FOL-03: no muestra enlaces si no recibe datos', () => {
    // Una lista vacia no debe romper el footer.
    render(<MemoryRouter><FooterLinks /></MemoryRouter>);
    expect(screen.getByRole('navigation')).toBeTruthy();
    expect(within(screen.getByRole('navigation')).queryAllByRole('link').length).toBe(0);
  });
});

