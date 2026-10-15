import { Modal } from 'react-bootstrap';
import { Boton } from '../atoms/Boton';
import { DatosFormulario } from '../molecules/DatosFormulario';

export function FormularioCuenta({ tipo, onCerrar }) {
  const registro = tipo === 'registro';
  const titulo = registro ? 'Registrarse' : 'Iniciar sesión';

  return (
    <Modal show={Boolean(tipo)} onHide={onCerrar} centered aria-labelledby="titulo-cuenta" data-bs-theme="dark">
      <Modal.Header closeButton closeLabel="Cerrar" className="cuenta-panel">
        <Modal.Title id="titulo-cuenta">{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="cuenta-panel">
        <form onSubmit={(evento) => evento.preventDefault()}>
          <DatosFormulario key={tipo} registro={registro} />
          <div className="d-flex justify-content-end gap-2">
            <Boton className="header-button" onClick={onCerrar}>Cerrar</Boton>
            <Boton type="submit" className="header-button header-button-register">
              {registro ? 'Registrarse' : 'Ingresar'}
            </Boton>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

