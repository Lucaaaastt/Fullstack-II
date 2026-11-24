import { useState } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import Image from '../atoms/Image';
import CardBody from '../molecules/CardBody';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { obtenerUsuario } from '../../context/validacionesLogin';
import '../../../style/ProductCard.css';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!obtenerUsuario()) {
      navigate('/login');
      return;
    }
    
    addToCart(product);
    setShowModal(true);
  };

  return (
    <>
      <Card className="product-card h-100 shadow-sm bg-dark text-white border-secondary">
        {/* Imagen recortada a 260px estandarizados */}
        <Image 
          src={product.image} 
          alt={product.name} 
          className="card-img-top" 
        />
        
        <Card.Body className="d-flex flex-column justify-content-between p-3">
          {/* Componente que renderiza Título y Precio con espacio reservado */}
          <CardBody
            title={product.name}
            price={product.price}
          />

          {/* Botones pegados siempre a la parte inferior de la tarjeta */}
          <div className="d-grid gap-2 mt-auto pt-2">
            <Button 
              variant="outline-light" 
              size="sm"
              onClick={() => navigate(`/productos/${product.id}`)}
            >
              Ver detalles
            </Button>

            <Button 
              variant="danger" 
              size="sm"
              onClick={handleAddToCart}
            >
              Agregar a Carro
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Modal de confirmación */}
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
    </>
  );
}

export default ProductCard;