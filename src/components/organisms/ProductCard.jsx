import { useState } from 'react';
import { Card, Modal } from 'react-bootstrap';
import Image from '../atoms/Image';
import { Boton } from '../atoms/Boton';
import CardBody from '../molecules/CardBody';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import '../../../style/ProductCard.css';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    setShowModal(true);
  };

  return (
    <>
      <Card className="product-card h-100 shadow-sm">
        <Image src={product.image} alt={product.name} />
        <Card.Body className="d-flex flex-column justify-content-between">
          <CardBody
            title={product.name}
            description={product.description}
            price={product.price}
          />
          <Boton variant="primary" onClick={() => navigate(`/productos/${product.id}`)}>
            Ver detalles
          </Boton>

          <Boton variant="success" onClick={handleAddToCart}>
            Agregar a Carro
          </Boton>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            Producto Añadido!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Desea continuar?
        </Modal.Body>
        <Modal.Footer>
          <Boton variant="secondary" onClick={() => setShowModal(false)}>
            Seguir comprando
          </Boton>
          <Boton variant="primary" onClick={() => navigate('/carro')}>
            Ir a pagar
          </Boton>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductCard;