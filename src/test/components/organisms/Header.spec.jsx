import '../../setupTests';

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Header } from '../../../components/organisms/Header';

describe('Organismo Header', () => {
  beforeEach(() => localStorage.removeItem('usuario'));
  afterEach(() => localStorage.removeItem('usuario'));
  const itemsPrueba = [
    { id: 'inicio', text: 'Inicio', href: '/' },
    { id: 'catalogo', text: 'Catalogo', href: '/productos' }
  ];

  it('HEA-01: muestra la marca principal y la barra de navegacion', () => {
    render(
      <MemoryRouter>
        <Header items={itemsPrueba} />
      </MemoryRouter>
    );

    // Marca principal
    expect(screen.getByText('TIENDA JDR')).toBeTruthy();

    // Elementos transmitidos a la molecula Navbar
    expect(screen.getByText('Inicio')).toBeTruthy();
    expect(screen.getByText('Catalogo')).toBeTruthy();
  });

  it('HEA-02: muestra el acceso a la página de cuenta cuando no hay sesión', () => {
    render(
      <MemoryRouter>
        <Header items={itemsPrueba} />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: 'Iniciar sesión' })).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Cerrar sesión' })).toBeNull();
  });

  it('HEA-03: navega a la página de login al pulsar Iniciar sesión', () => {
    render(
      <MemoryRouter>
        <Header items={itemsPrueba} />
        <Routes><Route path="/login" element={<h1>Página de cuenta</h1>} /></Routes>
      </MemoryRouter>
    );

    const botonLogin = screen.getByRole('button', { name: 'Iniciar sesión' });
    fireEvent.click(botonLogin);

    expect(screen.getByRole('heading', { name: 'Página de cuenta' })).toBeTruthy();
  });
});

