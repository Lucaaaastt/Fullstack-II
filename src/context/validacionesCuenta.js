export function validarCuenta({ nombre = '', correo = '', contrasena = '' , confirmarContrasena = '',}, registro) {
  // Primero reviso que no dejen campos vacíos o con puros espacios.
  if (registro && !nombre.trim()) {
    return 'Ingresa tu nombre.';
  }

  if (!correo.trim()) {
    return 'Ingresa tu correo.';
  }

  if (!contrasena.trim()) {
    return 'Ingresa tu contraseña.';
  }

  if (registro && contrasena !== confirmarContrasena) {
    return 'Las contraseñas no coinciden.';
  }

  // Le saco los espacios de los extremos y paso el correo a minusculas.
  const correoLimpio = correo.trim().toLowerCase();

  // Reviso que el correo tenga un usuario, una arroba y un dominio.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoLimpio)) {
    return 'Ingresa un correo valido, por ejemplo añañin@gmail.com.';
  }

  // En el registro uso los mismos dominios del proyecto original.
  // Comparo el dominio completo para no aceptar cosas como gmail.com.otro.cl.
  if (registro) {
    const dominio = correoLimpio.split('@')[1];
    const dominiosPermitidos = ['duoc.cl', 'gmail.com', 'hotmail.com'];

    if (!dominiosPermitidos.includes(dominio)) {
      return 'Usa un correo de duoc.cl, gmail.com o hotmail.com.';
    }
  }

  // Si no hay errores devuelvo un texto vacío.
  return '';
}
