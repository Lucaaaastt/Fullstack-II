import { Card } from 'react-bootstrap';
import Image from '../atoms/Image';
import { Boton } from '../atoms/Boton';
import CardBody from '../molecules/CardBody';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import '../../../style/ProductCard.css';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  if (!product) return null;

  return (
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

        <Boton variant="success" onClick={() => addToCart(product)}>
          Agregar a Carro
        </Boton>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;