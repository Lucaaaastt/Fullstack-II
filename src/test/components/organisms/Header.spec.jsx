import '../../setupTests';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../../../components/organisms/Header';

describe('Organismo Header', () => {
  const itemsPrueba = [
    { text: 'Inicio', path: '/' },
    { text: 'Catalogo', path: '/catalogo' }
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

  it('HEA-02: renderiza los botones de "Iniciar sesión" y "Registrarse"', () => {
    render(
      <MemoryRouter>
        <Header items={itemsPrueba} />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: 'Iniciar sesión' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Registrarse' })).toBeTruthy();
  });

  it('HEA-03: abre el modal de FormularioCuenta en modo "login" al hacer clic en "Iniciar sesión"', () => {
    const { container } = render(
      <MemoryRouter>
        <Header items={itemsPrueba} />
      </MemoryRouter>
    );

    const botonLogin = screen.getByRole('button', { name: 'Iniciar sesión' });
    fireEvent.click(botonLogin);

    // Verificamos que el modal este abierto
    expect(screen.getByRole('dialog')).toBeTruthy();

    // Consultamos de forma especifica el titulo del modal usando su ID para evitar colisionar con el boton
    const tituloModal = container.ownerDocument.querySelector('#titulo-cuenta');
    expect(tituloModal).toBeTruthy();
    expect(tituloModal.textContent).toBe('Iniciar sesión');
  });
});