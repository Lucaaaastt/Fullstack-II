import { useState } from 'react';
import { Container, Card, Row, Col, Modal, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { Texto } from "../components/atoms/Texto";
import { useCart } from "../context/CartContext";
import products from "../data/products";
import Image from "../components/atoms/Image";

function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);

  const producto = products.find((p) => p.id === parseInt(id));

  if (!producto) {
    return (
      <Container className="my-5 text-center text-white">
        <h1>PRODUCTO NO ENCONTRADO!</h1>
        <Button variant="outline-light" className="mt-3" onClick={() => navigate('/')}>
          Volver al Inicio
        </Button>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart(producto);
    setShowModal(true);
  };

  return (
    <Container className="my-5">
      <Card className="bg-dark text-white shadow-lg border-0 p-4 mx-auto" style={{ maxWidth: '900px' }}>
        <Row className="g-4 align-items-center">
          <Col md={5} className="text-center">
            <Image 
              src={producto.image} 
              alt={producto.name} 
              className="img-fluid rounded shadow"
              style={{ 
                maxHeight: '380px', 
                width: '100%', 
                objectFit: 'contain' 
              }}
            />
          </Col>
          <Col md={7} className="text-center text-md-start">
            <Texto variant="h2" className="fw-bold mb-3">{producto.name}</Texto>
            <Texto variant="p" className="text-light mb-4 lead">{producto.description}</Texto>
            <Texto variant="h3" className="text-danger fw-bold mb-4">${producto.price}</Texto>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start flex-wrap">
              <Button 
                variant="danger" 
                size="lg" 
                className="px-4 fw-semibold" 
                onClick={handleAddToCart}
              >
                AGREGAR A CARRO
              </Button>

              <Button 
                variant="outline-light" 
                size="lg" 
                className="px-4" 
                onClick={() => navigate(-1)}
              >
                VOLVER
              </Button>
            </div>
          </Col>

        </Row>
      </Card>

      {/* OPC COMPRA */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered className="text-dark">
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold fs-5">
            PRODUCTO AÑADIDO!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿DESEA CONTINUAR?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            SEGUIR COMPRANDO
          </Button>
          <Button variant="primary" onClick={() => navigate('/carro')}>
            IR A PAGAR
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProductoDetalle;