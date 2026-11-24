import '../../setupTests';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { FormularioCuenta } from '../../../components/organisms/FormularioCuenta';
import { Header } from '../../../components/organisms/Header';
import Login from '../../../pages/Login';
import { obtenerUsuario, esAdmin } from '../../../context/validacionesLogin';

describe('Cuenta conectada al backend', () => {
  const cliente = { id: 7, nombre: 'Cliente', correo: 'cliente@gmail.com', rol: 'CLIENTE' };

  beforeEach(() => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('Admin');
  });

  afterEach(() => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('Admin');
  });

  function responder(datos, status = 200) {
    return new Response(JSON.stringify(datos), { status, headers: { 'Content-Type': 'application/json' } });
  }

  function llenar(registro = false) {
    if (registro) fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: ' Cliente ' } });
    fireEvent.change(screen.getByLabelText('Correo'), { target: { value: 'CLIENTE@Gmail.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'clave-prueba' } });
    if (registro) fireEvent.change(screen.getByLabelText('Confirmar contraseña'), { target: { value: 'clave-prueba' } });
    fireEvent.click(screen.getByRole('button', { name: registro ? 'Registrarse' : 'Ingresar' }));
  }

  it('registra con la API y conserva solo los datos públicos del usuario devuelto', async () => {
    const peticion = spyOn(window, 'fetch').and.resolveTo(responder({ ...cliente, contrasena: 'no-guardar' }, 201));
    const cerrar = jasmine.createSpy('cerrar');
    const autenticar = jasmine.createSpy('autenticar');
    render(<FormularioCuenta tipo="registro" onCerrar={cerrar} onAutenticado={autenticar} />);

    llenar(true);
    await waitFor(() => {
      if (!cerrar.calls.any()) throw new Error('Esperando respuesta de la API');
    });

    expect(peticion.calls.count()).toBe(1);
    const [url, opciones] = peticion.calls.mostRecent().args;
    expect(url).toBe('/api/usuarios');
    expect(opciones.method).toBe('POST');
    expect(JSON.parse(opciones.body)).toEqual({ nombre: 'Cliente', correo: 'cliente@gmail.com', contrasena: 'clave-prueba' });
    expect(JSON.parse(localStorage.getItem('usuario'))).toEqual(cliente);
    expect(autenticar).toHaveBeenCalledOnceWith(cliente);
  });

  it('inicia sesión usando el ID real que devuelve la API', async () => {
    const peticion = spyOn(window, 'fetch').and.resolveTo(responder(cliente));
    const cerrar = jasmine.createSpy('cerrar');
    render(<FormularioCuenta tipo="login" onCerrar={cerrar} />);

    llenar();
    await waitFor(() => {
      if (!cerrar.calls.any()) throw new Error('Esperando respuesta de la API');
    });

    expect(peticion.calls.mostRecent().args[0]).toBe('/api/usuarios/login');
    expect(JSON.parse(peticion.calls.mostRecent().args[1].body))
      .toEqual({ correo: 'cliente@gmail.com', contrasena: 'clave-prueba' });
    expect(obtenerUsuario()).toEqual(cliente);
  });

  it('muestra el correo duplicado y deja el formulario abierto sin guardar sesión', async () => {
    spyOn(window, 'fetch').and.resolveTo(responder({ detail: 'El correo ya está registrado' }, 409));
    const cerrar = jasmine.createSpy('cerrar');
    render(<FormularioCuenta tipo="registro" onCerrar={cerrar} />);

    llenar(true);

    expect(await screen.findByText('El correo ya está registrado')).toBeTruthy();
    expect(cerrar).not.toHaveBeenCalled();
    expect(obtenerUsuario()).toBeNull();
  });

  it('no permite entrar como administrador con una cuenta cliente', async () => {
    spyOn(window, 'fetch').and.resolveTo(responder(cliente));
    const autenticar = jasmine.createSpy('autenticar');
    render(<FormularioCuenta tipo="admin" onCerrar={() => {}} onAutenticado={autenticar} />);

    llenar();

    expect(await screen.findByText('Esta cuenta no tiene acceso de administrador.')).toBeTruthy();
    expect(autenticar).not.toHaveBeenCalled();
    expect(esAdmin()).toBeFalse();
    expect(obtenerUsuario()).toBeNull();
  });

  it('reconoce el rol administrador enviado por el backend y elimina la bandera antigua', async () => {
    const admin = { ...cliente, id: 9, rol: 'ADMIN' };
    spyOn(window, 'fetch').and.resolveTo(responder(admin));
    localStorage.setItem('Admin', 'true');
    const cerrar = jasmine.createSpy('cerrar');
    render(<FormularioCuenta tipo="admin" onCerrar={cerrar} />);

    llenar();
    await waitFor(() => {
      if (!cerrar.calls.any()) throw new Error('Esperando respuesta de la API');
    });

    expect(obtenerUsuario()).toEqual(admin);
    expect(esAdmin()).toBeTrue();
    expect(localStorage.getItem('Admin')).toBeNull();
  });

  it('evita solicitudes duplicadas mientras espera la respuesta', async () => {
    let resolver;
    const pendiente = new Promise(resolve => { resolver = resolve; });
    const peticion = spyOn(window, 'fetch').and.returnValue(pendiente);
    const cerrar = jasmine.createSpy('cerrar');
    render(<FormularioCuenta tipo="login" onCerrar={cerrar} />);

    llenar();
    const boton = screen.getByRole('button', { name: 'Ingresar' });
    expect(boton.disabled).toBeTrue();
    fireEvent.submit(boton.closest('form'));
    expect(peticion.calls.count()).toBe(1);

    resolver(responder(cliente));
    await waitFor(() => {
      if (!cerrar.calls.any()) throw new Error('Esperando respuesta de la API');
    });
  });

  it('muestra un error de conexión sin crear una sesión', async () => {
    spyOn(window, 'fetch').and.rejectWith(new TypeError('Failed to fetch'));
    render(<FormularioCuenta tipo="login" onCerrar={() => {}} />);

    llenar();

    expect(await screen.findByText('No se pudo conectar con el servidor. Intenta nuevamente.')).toBeTruthy();
    expect(obtenerUsuario()).toBeNull();
    expect(screen.getByRole('button', { name: 'Ingresar' }).disabled).toBeFalse();
  });

  it('rechaza una respuesta exitosa que no contiene un usuario válido', async () => {
    spyOn(window, 'fetch').and.resolveTo(responder({ estado: 'ok' }));
    render(<FormularioCuenta tipo="login" onCerrar={() => {}} />);

    llenar();

    expect(await screen.findByText('El servidor no devolvió un usuario válido.')).toBeTruthy();
    expect(obtenerUsuario()).toBeNull();
  });

  it('actualiza la cabecera al entrar, restaura al recargar y permite cerrar sesión', async () => {
    spyOn(window, 'fetch').and.resolveTo(responder(cliente));
    const vista = render(<MemoryRouter><Header /><Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<h1>Inicio</h1>} />
    </Routes></MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }));
    llenar();
    expect(await screen.findByText('Hola, Cliente')).toBeTruthy();
    vista.unmount();

    render(<MemoryRouter><Header /></MemoryRouter>);
    expect(screen.getByText('Hola, Cliente')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Cerrar sesión' }));

    expect(obtenerUsuario()).toBeNull();
    expect(screen.getByRole('button', { name: 'Iniciar sesión' })).toBeTruthy();
  });

  it('ignora datos dañados y una bandera Admin antigua sin un usuario real', () => {
    localStorage.setItem('usuario', '{invalido');
    localStorage.setItem('Admin', 'true');

    render(<MemoryRouter><Header /></MemoryRouter>);

    expect(screen.getByRole('button', { name: 'Iniciar sesión' })).toBeTruthy();
    expect(esAdmin()).toBeFalse();
  });
});
