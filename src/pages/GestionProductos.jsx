import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Texto } from '../components/atoms/Texto';
import FiltrosProductos from '../components/organisms/FiltrosProductos';
import ListaProductos from '../components/organisms/ListaProductos';
import ModalEditarProducto from '../components/organisms/ModalEditarProducto';
import ModalEliminarProducto from '../components/organisms/ModalEliminarProducto';
import { useProductos } from '../context/ProductosContext';
import { esAdmin } from '../context/validacionesLogin.js';

function GestionProductos() {

    useEffect(() => {
        if (!esAdmin()) {
            window.location.href = '/';
        }
    }, []);

    const [busqueda, setBusqueda] = useState('');
    const [orden, setOrden] = useState('Nombre (A-Z)');
    const { productos, setProductos } = useProductos();
    const [productoEditar, setProductoEditar] = useState(null);
    const [productoEliminar, setProductoEliminar] = useState(null);

    function guardarProducto(actualizado) {
        if (!Number.isFinite(actualizado.price) || actualizado.price <= 0) return;

        setProductos(actuales =>
            actuales.map(producto =>
                producto.id === actualizado.id ? actualizado : producto
            )
        );
        setProductoEditar(null);
    }

    function eliminarProducto(eliminado) {
        setProductos(actuales =>
            actuales.filter(producto => producto.id !== eliminado.id)
        );
        setProductoEliminar(null);
    }

    const productosFiltrados = productos.filter(producto =>
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
                    <ListaProductos
                        productos={productosOrdenados}
                        onEditar={setProductoEditar}
                        onEliminar={setProductoEliminar}
                    />
                </Col>
            </Row>

            {productoEditar && <ModalEditarProducto
                mostrar={Boolean(productoEditar)}
                producto={productoEditar}
                onCerrar={() => setProductoEditar(null)}
                onGuardar={guardarProducto}
            />}

            <ModalEliminarProducto
                mostrar={Boolean(productoEliminar)}
                producto={productoEliminar}
                onCerrar={() => setProductoEliminar(null)}
                onEliminar={eliminarProducto}
            />
        </Container>
    );
}

export default GestionProductos;
