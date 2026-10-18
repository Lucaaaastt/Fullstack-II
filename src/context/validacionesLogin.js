export function loginForm(tipo, correo, contrasena) {
  if (tipo === 'admin') {
    if (!correo.toLowerCase().endsWith('@gmail.com')) {
      alert('Error: el correo debe ser de Gmail (@gmail.com).');
      return;
    }

    alert(`Correo: ${correo}\nContraseña: ${contrasena}`);
  } else {
    alert('ahi va');
  }
}