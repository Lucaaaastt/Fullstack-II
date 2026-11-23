function datosPublicos(usuario) {
  return { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol };
}

function notificarCambioSesion() {
  window.dispatchEvent(new Event('sesion-actualizada'))
}

export function obtenerUsuario() {
  try {
    const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
    if (!usuario || !Number.isSafeInteger(usuario.id) || usuario.id <= 0
      || typeof usuario.nombre !== 'string' || typeof usuario.correo !== 'string'
      || !['CLIENTE', 'ADMIN'].includes(usuario.rol)) return null;
    return datosPublicos(usuario);
  } catch {
    return null;
  }
}

export function guardarUsuario(usuario) {
  const datos = datosPublicos(usuario);
  localStorage.setItem('usuario', JSON.stringify(datos));
  localStorage.removeItem('Admin');
  notificarCambioSesion();
  return datos;
}

export function cerrarSesion() {
  localStorage.removeItem('usuario');
  localStorage.removeItem('Admin');
  notificarCambioSesion();
}

export function esAdmin() {
    return obtenerUsuario()?.rol === 'ADMIN';
}