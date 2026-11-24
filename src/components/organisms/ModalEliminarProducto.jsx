import { Modal } from 'react-bootstrap';
import { Boton } from '../atoms/Boton';
import { Texto } from '../atoms/Texto';

function ModalEliminarProducto({ mostrar, producto, onCerrar, onEliminar, procesando = false, error = '' }) {
    if (!producto) return null;

    function confirmarEliminacion() {
        onEliminar(producto);
    }

    return (
        <Modal
            show={mostrar}
            onHide={() => { if (!procesando) onCerrar(); }}
            centered
            aria-labelledby="titulo-eliminar-producto"
            data-bs-theme="dark"
        >
            <Modal.Header
                closeButton
                closeLabel="Cerrar"
                className="cuenta-panel"
            >
                <Modal.Title id="titulo-eliminar-producto">
                    Eliminar producto
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="cuenta-panel">
                <Texto>
                    ¿Estás seguro de que deseas eliminar
                    {' '}{producto.name}?
                </Texto>

                <div className="d-flex justify-content-end gap-2 mt-3">
                    <Boton
                        className="header-button"
                        onClick={onCerrar}
                        disabled={procesando}
                    >
                        Cancelar
                    </Boton>

                    <Boton
                        className="header-button header-button-register"
                        onClick={confirmarEliminacion}
                        disabled={procesando}
                    >
                        {procesando ? 'Eliminando...' : 'Eliminar'}
                    </Boton>
                </div>
                {error && <p role="alert">{error}</p>}
            </Modal.Body>
        </Modal>
    );
}

export default ModalEliminarProducto;
