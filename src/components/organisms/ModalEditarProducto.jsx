import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Campo } from '../atoms/Campo';
import { Boton } from '../atoms/Boton';

function ModalEditarProducto({ mostrar, producto, onCerrar, onGuardar }) {
const [nombre, setNombre] = useState('');
const [descripcion, setDescripcion] = useState('');
const [precio, setPrecio] = useState('');
const [mensaje, setMensaje] = useState('');

useEffect(() => {
    if (producto) {
        setNombre(producto.name);
        setDescripcion(producto.description);
        setPrecio(String(producto.price));
    }
}, [producto]);

function guardarCambios(e) {
    e.preventDefault();

    const precioNumerico = Number(precio);

    if (!Number.isFinite(precioNumerico) || precioNumerico <= 0) {
        setMensaje('El precio debe ser un número positivo.');
        return;
    }

    onGuardar({
        ...producto,
        name: nombre,
        description: descripcion,
        price: Number(precio)
    });
}

if (!producto) return null;

return (
    <Modal show={mostrar} onHide={onCerrar} centered>
        <Modal.Header closeButton>
            <Modal.Title>Editar producto</Modal.Title>
        </Modal.Header>

        <form onSubmit={guardarCambios}>
            <Modal.Body>
                <Campo
                    id="nombre-producto"
                    nombre="nombre"
                    etiqueta="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                <Campo
                    id="descripcion-producto"
                    nombre="descripcion"
                    etiqueta="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />

                <Campo
                    id="precio-producto"
                    nombre="precio"
                    etiqueta="Precio"
                    tipo="number"
                    value={precio}
                    onChange={(e) => {setPrecio(e.target.value); setMensaje('')}}
                />
                {mensaje && (
                    <p role="alert" className="text-danger">
                        {mensaje}
                    </p>
                )}
            </Modal.Body>

            <Modal.Footer>
                <Boton onClick={onCerrar}>
                    Cancelar
                </Boton>

                <Boton type="submit">
                    Guardar cambios
                </Boton>
            </Modal.Footer>
        </form>
    </Modal>
);

}

export default ModalEditarProducto;
