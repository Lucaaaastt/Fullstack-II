import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Boton } from '../components/atoms/Boton';
import { Container, Row, Col } from 'react-bootstrap';
import { Texto } from '../components/atoms/Texto';
import FiltrosProductos from '../components/organisms/FiltrosProductos';
import ListaProductos from '../components/organisms/ListaProductos';
import ModalEditarProducto from '../components/organisms/ModalEditarProducto';
import ModalEliminarProducto from '../components/organisms/ModalEliminarProducto';
import { useProductos } from '../context/ProductosContext';
import { esAdmin } from '../context/validacionesLogin.js';

function GestionProductos() {

    const [busqueda, setBusqueda] = useState('');
    const [orden, setOrden] = useState('Nombre (A-Z)');
    const { productos, cargando, error, guardarProducto: guardarEnApi, eliminarProducto: eliminarEnApi } = useProductos();
    const [productoEditar, setProductoEditar] = useState(null);
    const [productoEliminar, setProductoEliminar] = useState(null);

    const [creando, setCreando] = useState(false);
    const [procesando, setProcesando] = useState(false);
    const [errorOperacion, setErrorOperacion] = useState('');
    const [aviso, setAviso] = useState('');

    async function guardarProducto(datos) {
        if (procesando) return;
        setProcesando(true);
        setErrorOperacion('');
        setAviso('');
        try {
            await guardarEnApi(datos);
            setProductoEditar(null);
            setCreando(false);
            setAviso('Producto guardado correctamente.');
        } catch (error) {
            setErrorOperacion(error.message);
        } finally { setProcesando(false); }
    }

    async function eliminarProducto(producto) {
        if (procesando) return;
        setProcesando(true);
        setErrorOperacion('');
        setAviso('');
        try {
            await eliminarEnApi(producto.id);
            setProductoEliminar(null);
            setAviso('Producto eliminado correctamente.');
        } catch (error) {
            setErrorOperacion(error.message);
        } finally { setProcesando(false); }
    }

    if (!esAdmin()) return <Navigate to="/login" replace />;
    if (cargando) return <p role="status">Cargando productos...</p>;
    if (error) return <p role="alert">{error}</p>;

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
                    {aviso && <p role="status">{aviso}</p>}
                    <Boton onClick={() => { setErrorOperacion(''); setCreando(true); }}>Agregar producto</Boton>
                    {productosOrdenados.length === 0 && <p>No hay productos activos.</p>}
                    <ListaProductos
                        productos={productosOrdenados}
                        onEditar={producto => { setErrorOperacion(''); setProductoEditar(producto); }}
                        onEliminar={producto => { setErrorOperacion(''); setProductoEliminar(producto); }}
                    />
                </Col>
            </Row>

            {(productoEditar || creando) && <ModalEditarProducto
                key={productoEditar?.id || 'nuevo'}
                modoCrear={creando}
                procesando={procesando}
                error={errorOperacion}
                mostrar={Boolean(productoEditar) || creando}
                producto={productoEditar}
                onCerrar={() => { setProductoEditar(null); setCreando(false); }}
                onGuardar={guardarProducto}
            />}

            <ModalEliminarProducto
                procesando={procesando}
                error={errorOperacion}
                mostrar={Boolean(productoEliminar)}
                producto={productoEliminar}
                onCerrar={() => setProductoEliminar(null)}
                onEliminar={eliminarProducto}
            />
        </Container>
    );
}

export default GestionProductos;
