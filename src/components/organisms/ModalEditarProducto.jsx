import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Campo } from '../atoms/Campo';
import { Boton } from '../atoms/Boton';

export default function ModalEditarProducto({ mostrar, producto, modoCrear = false, onCerrar, onGuardar, procesando = false, error = '' }) {
  const [nombre, setNombre] = useState(producto?.name || '');
  const [descripcion, setDescripcion] = useState(producto?.description || '');
  const [precio, setPrecio] = useState(String(producto?.price ?? ''));
  const [imagen, setImagen] = useState(producto?.image || '');
  const [novedad, setNovedad] = useState(producto?.novedad === true);
  const [mensaje, setMensaje] = useState('');

  function guardar(evento) {
    evento.preventDefault();
    if (procesando) return;
    if (!nombre.trim() || nombre.trim().length > 150) return setMensaje('Ingresa un nombre de hasta 150 caracteres.');
    if (!descripcion.trim() || descripcion.trim().length > 500) return setMensaje('Ingresa una descripción de hasta 500 caracteres.');
    if (!Number.isSafeInteger(Number(precio)) || Number(precio) <= 0) return setMensaje('El precio debe ser un número entero positivo.');
    if (!imagen.trim() || imagen.trim().length > 500) return setMensaje('Ingresa una imagen de hasta 500 caracteres.');
    setMensaje('');
    onGuardar({ ...producto, name: nombre, description: descripcion, price: Number(precio), image: imagen, novedad });
  }

  return <Modal show={mostrar} onHide={() => { if (!procesando) onCerrar(); }} centered data-bs-theme="dark">
    <Modal.Header closeButton closeLabel="Cerrar"><Modal.Title>{modoCrear ? 'Agregar producto' : 'Editar producto'}</Modal.Title></Modal.Header>
    <form onSubmit={guardar}>
      <Modal.Body><fieldset disabled={procesando}>
        <Campo id="nombre-producto" nombre="nombre" etiqueta="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
        <Campo id="descripcion-producto" nombre="descripcion" etiqueta="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
        <Campo id="precio-producto" nombre="precio" etiqueta="Precio" tipo="number" value={precio} onChange={e => setPrecio(e.target.value)} />
        <Campo id="imagen-producto" nombre="imagen" etiqueta="Imagen (URL o ruta)" value={imagen} onChange={e => setImagen(e.target.value)} />
        <label><input type="checkbox" checked={novedad} onChange={e => setNovedad(e.target.checked)} /> Mostrar en novedades</label>
      </fieldset>{(mensaje || error) && <p role="alert">{mensaje || error}</p>}</Modal.Body>
      <Modal.Footer>
        <Boton onClick={onCerrar} disabled={procesando}>Cancelar</Boton>
        <Boton type="submit" disabled={procesando}>{procesando ? 'Guardando...' : 'Guardar cambios'}</Boton>
      </Modal.Footer>
    </form>
  </Modal>;
}
