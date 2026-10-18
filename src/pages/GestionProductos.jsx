import FiltrosProductos from '../components/organisms/FiltrosProductos';
import { Texto } from '../components/atoms/Texto';
import { Container, Row, Col } from 'react-bootstrap';
import products from '../data/products';
import ListaProductos from '../components/organisms/ListaProductos';

function GestionProductos() {
    return (
        <Container fluid className="gestion-productos">
            <Row>
                <Col md={3} className="filtros">
                    <FiltrosProductos />
                </Col>

                <Col md={9} className="productos">
                    <Texto variant="h1">Productos</Texto>

                    <ListaProductos productos={products} />
                </Col>
            </Row>
        </Container>
    );
}

export default GestionProductos;