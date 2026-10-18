import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Boton } from '../atoms/Boton';
import { DatosFormulario } from '../molecules/DatosFormulario';
import { validarCuenta } from '../../context/validacionesCuenta';

export function FormularioCuenta({ tipo, onCerrar }) {
  const [mensaje, setMensaje] = useState('');
  const registro = tipo === 'registro';
  const titulo = registro ? 'Registrarse' : 'Iniciar sesión';

  function cerrar() {
    setMensaje('');
    onCerrar();
  }

  function enviar(evento) {
    evento.preventDefault();

    // Tomo lo que escribieron en los campos usando sus nombres.
    const campos = new FormData(evento.currentTarget);
    const datos = {
      nombre: campos.get('nombre') || '',
      correo: campos.get('correo') || '',
      contrasena: campos.get('contrasena') || '',
    };

    // La validación está en context, acá solo muestro el resultado.
    const error = validarCuenta(datos, registro);
    setMensaje(error || 'Campos correctos. Todavía no se crean cuentas ni se inicia sesión.');
  }

  return (
    <Modal show={Boolean(tipo)} onHide={cerrar} centered aria-labelledby="titulo-cuenta" data-bs-theme="dark">
      <Modal.Header closeButton closeLabel="Cerrar" className="cuenta-panel">
        <Modal.Title id="titulo-cuenta">{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="cuenta-panel">
        {/* Uso mis mensajes en español en vez de los avisos del navegador. */}
        <form noValidate onSubmit={enviar} onInput={() => setMensaje('')}>
          <DatosFormulario key={tipo} registro={registro} />
          <div className="d-flex justify-content-end gap-2">
            <Boton className="header-button" onClick={cerrar}>Cerrar</Boton>
            <Boton type="submit" className="header-button header-button-register">
              {registro ? 'Registrarse' : 'Ingresar'}
            </Boton>
          </div>
          <p role="status" className="mt-3 mb-0">{mensaje}</p>
        </form>
      </Modal.Body>
    </Modal>
  );
}