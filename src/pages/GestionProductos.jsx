import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Texto } from '../components/atoms/Texto';
import FiltrosProductos from '../components/organisms/FiltrosProductos';
import ListaProductos from '../components/organisms/ListaProductos';
import products from '../data/products';


function GestionProductos() {
    const [busqueda, setBusqueda] = useState('');
    const [orden, setOrden] = useState('Nombre (A-Z)');

    const productosFiltrados = products.filter((producto) =>
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

                    <ListaProductos productos={productosOrdenados} />
                </Col>
            </Row>
        </Container>
    );
}

export default GestionProductos;