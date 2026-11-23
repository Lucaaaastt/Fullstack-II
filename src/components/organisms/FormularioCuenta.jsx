import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Boton } from '../atoms/Boton';
import { DatosFormulario } from '../molecules/DatosFormulario';
import { validarCuenta } from '../../context/validacionesCuenta';
import { guardarUsuario } from '../../context/validacionesLogin';
import { iniciarSesion, registrarUsuario } from '../../services/usuarios';

export function FormularioCuenta({ tipo, onCerrar, onAutenticado }) {
  const [mensaje, setMensaje] = useState('');
  const [enviando, setEnviando] = useState(false);
  const registro = tipo === 'registro';
  const titulo = registro ? 'Registrarse' : 'Iniciar sesión';

  function cerrar() {
    if (enviando) return;
    setMensaje('');
    onCerrar();
  }

  async function enviar(evento) {
    evento.preventDefault();
    if (enviando) return;

    // Tomo lo que escribieron en los campos usando sus nombres.
    const campos = new FormData(evento.currentTarget);
    const datos = {
      nombre: campos.get('nombre') || '',
      correo: campos.get('correo') || '',
      contrasena: campos.get('contrasena') || '',
      confirmarContrasena: campos.get('confirmarContrasena') || '',
    };

    const error = validarCuenta(datos, registro);
    if (error) {
      setMensaje(error);
      return;
    }

    setEnviando(true);
    setMensaje(registro ? 'Creando cuenta...' : 'Iniciando sesión...');
    try {
      const usuario = await (registro ? registrarUsuario(datos) : iniciarSesion(datos));
      if (tipo === 'admin' && usuario.rol !== 'ADMIN') {
        throw new Error('Esta cuenta no tiene acceso de administrador.');
      }
      const sesion = guardarUsuario(usuario);
      onAutenticado?.(sesion);
      onCerrar();
    } catch (error) {
      setMensaje(error.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <Modal show={Boolean(tipo)} onHide={cerrar} centered aria-labelledby="titulo-cuenta" data-bs-theme="dark">
      <Modal.Header closeButton closeLabel="Cerrar" className="cuenta-panel">
        <Modal.Title id="titulo-cuenta">{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="cuenta-panel">
        {/* Uso mis mensajes en español en vez de los avisos del navegador. */}
        <form noValidate onSubmit={enviar} onInput={() => { if (!enviando) setMensaje(''); }}>
          <fieldset disabled={enviando}>
            <DatosFormulario key={tipo} registro={registro} />
            <div className="d-flex justify-content-end gap-2">
              <Boton className="header-button" onClick={cerrar} disabled={enviando}>Cerrar</Boton>
              <Boton type="submit" className="header-button header-button-register" disabled={enviando}>
                {registro ? 'Registrarse' : 'Ingresar'}
              </Boton>
            </div>
          </fieldset>
          <p role="status" className="mt-3 mb-0">{mensaje}</p>
        </form>
      </Modal.Body>
    </Modal>
  );
}
