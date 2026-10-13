import { Card } from 'react-bootstrap';
import Image from '../atoms/Image';
import { Boton } from '../atoms/Boton';
import CardBody from '../molecules/CardBody';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();

  if (!product) return null;

  return (
    <Card className="h-100 shadow-sm">
      <Image src={product.image} alt={product.name} />
      <Card.Body className="d-flex flex-column justify-content-between">
        {/* Asegúrate de pasar las propiedades dinámicas de product */}
        <CardBody
          title={product.name}
          description={product.description}
          price={product.price}
        />
        <Boton variant="primary" onClick={() => navigate(`/productos/${product.id}`)}>
          Ver detalles
        </Boton>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;