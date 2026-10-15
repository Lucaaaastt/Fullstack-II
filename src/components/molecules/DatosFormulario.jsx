import { Campo } from '../atoms/Campo';

export function DatosFormulario({ registro = false }) {
  const prefijo = registro ? 'registro' : 'login';

  return (
    <>
      {registro && (
        <Campo id="registro-nombre" nombre="nombre" etiqueta="Nombre" autoComplete="name" />
      )}
      <Campo id={`${prefijo}-correo`} nombre="correo" etiqueta="Correo" tipo="email" autoComplete="email" />
      <Campo
        id={`${prefijo}-contrasena`}
        nombre="contrasena"
        etiqueta="Contraseña"
        tipo="password"
        autoComplete={registro ? 'new-password' : 'current-password'}
      />
    </>
  );
}
