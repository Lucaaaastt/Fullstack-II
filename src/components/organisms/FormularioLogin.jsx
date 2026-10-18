import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Boton } from '../atoms/Boton';

export function FormularioLogin({ mostrar, onCerrar }) {
  const [mensaje, setMensaje] = useState('');

  function cerrar() {
    setMensaje('');
    onCerrar();
  }

  function enviar(evento) {
    evento.preventDefault();
    setMensaje('El formulario está listo. La comprobación de usuarios aún está pendiente.');
  }

  return (
    <Modal show={mostrar} onHide={cerrar} centered aria-labelledby="titulo-login">
      <Modal.Header closeButton closeLabel="Cerrar" className="login-panel">
        <Modal.Title id="titulo-login">Iniciar sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body className="login-panel">
        <form onSubmit={enviar}>
          <label htmlFor="login-correo" className="form-label">Correo</label>
          <input
            id="login-correo"
            name="correo"
            type="email"
            className="form-control mb-3"
            autoComplete="username"
            required
          />

          <label htmlFor="login-contrasena" className="form-label">Contraseña</label>
          <input
            id="login-contrasena"
            name="contrasena"
            type="password"
            className="form-control mb-3"
            autoComplete="current-password"
            required
          />

          <div className="d-flex justify-content-end gap-2">
            <Boton className="header-button" onClick={cerrar}>Cerrar</Boton>
            <Boton type="submit" className="header-button header-button-register">Ingresar</Boton>
          </div>
          <p role="status" className="mt-3">{mensaje}</p>
        </form>
      </Modal.Body>
    </Modal>
  );
}