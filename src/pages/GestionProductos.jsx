import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Texto } from '../components/atoms/Texto';
import FiltrosProductos from '../components/organisms/FiltrosProductos';
import ListaProductos from '../components/organisms/ListaProductos';
import ModalEditarProducto from '../components/organisms/ModalEditarProducto';
import products from '../data/products';


function GestionProductos() {
    const [busqueda, setBusqueda] = useState('');
    const [orden, setOrden] = useState('Nombre (A-Z)');
    const [productoEditar, setProductoEditar] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [productos, setProductos] = useState(products);

    function abrirModalEditar(producto) {
        setProductoEditar(producto);
        setMostrarModal(true);
    }

    function cerrarModal() {
        setMostrarModal(false);
        setProductoEditar(null);
    }

    function guardarProducto(productoActualizado) {
        if (!Number.isFinite(productoActualizado.price) ||
            productoActualizado.price <= 0) {
            return;
        }

        setProductos(actuales =>
            actuales.map(producto =>
                producto.id === productoActualizado.id
                    ? productoActualizado
                    : producto
            )
        );
        cerrarModal();
    }

    const productosFiltrados = productos.filter((producto) =>
        producto.name.toLowerCase().includes(busqueda.toLowerCase())
    );

    const productosOrdenados = [...productosFiltrados];

    if (orden === 'Nombre (A-Z)') {
        productosOrdenados.sort((a, b) => a.name.localeCompare(b.name));
    } else if (orden === 'Precio: menor a mayor') {
        productosOrdenados.sort((a, b) => a.price - b.price);
    } else if (orden === 'Precio: mayor a menor') {
        productosOrdenados.sort((a, b) => b.price - a.price);
    }
    
    
    return (
        <Container fluid className="gestion-productos">
            <Row>
                <Col md={3} className="filtros">
                    <FiltrosProductos
                        busqueda={busqueda}
                        setBusqueda={setBusqueda}
                        orden={orden}
                        setOrden={setOrden}
                    />
                </Col>

                <Col md={9} className="productos">
                    <Texto variant="h1">Productos</Texto>

                    <ListaProductos productos={productosOrdenados} onEditar={abrirModalEditar}/>
                </Col>
            </Row>

            <ModalEditarProducto
                mostrar={mostrarModal}
                producto={productoEditar}
                onCerrar={cerrarModal}
                onGuardar={guardarProducto}
            />
        </Container>
    );
}

export default GestionProductos;