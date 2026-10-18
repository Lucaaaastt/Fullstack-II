import { validarAdmin } from '../data/admin.js'

export function loginForm(tipo, correo, contrasena) {
    if (tipo === 'admin') {
        if (!validarAdmin(correo, contrasena)) {
            alert('Correo o contraseña incorrectos.');
            return;
        }

        localStorage.setItem('Admin', 'true');
        window.location.href = '/admin/productos';
    } else {
        alert('ahi va');
    }
}

export function esAdmin() {
    return localStorage.getItem('Admin') === 'true';
}