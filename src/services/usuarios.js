async function solicitarUsuario(ruta, datos) {
  const apiUrl = (import.meta.env?.VITE_API_URL || '').trim().replace(/\/+$/, '');
  let respuesta;
  try {
    respuesta = await fetch(`${apiUrl}/api/usuarios${ruta}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
  } catch {
    throw new Error('No se pudo conectar con el servidor. Intenta nuevamente.');
  }

  const usuario = await respuesta.json().catch(() => null);
  if (!respuesta.ok) {
    const mensajes = {
      400: 'Revisa los datos del formulario.',
      401: 'Correo o contraseña incorrectos.',
      409: 'El correo ya está registrado.',
    };
    throw new Error(usuario?.detail || mensajes[respuesta.status] || 'No se pudo completar la solicitud.');
  }
  if (!usuario || !Number.isSafeInteger(usuario.id) || usuario.id <= 0
    || typeof usuario.nombre !== 'string' || typeof usuario.correo !== 'string'
    || !['CLIENTE', 'ADMIN'].includes(usuario.rol)) {
    throw new Error('El servidor no devolvió un usuario válido.');
  }
  return usuario;
}

export function registrarUsuario({ nombre, correo, contrasena }) {
  return solicitarUsuario('', {
    nombre: nombre.trim(),
    correo: correo.trim().toLowerCase(),
    contrasena,
  });
}

export function iniciarSesion({ correo, contrasena }) {
  return solicitarUsuario('/login', { correo: correo.trim().toLowerCase(), contrasena });
}
