const admin = {
    correo: 'admin@gmail.com',
    contrasena: 'admin123'
};

export function validarAdmin(correo, contrasena) {
    return correo === admin.correo &&
           contrasena === admin.contrasena;
}