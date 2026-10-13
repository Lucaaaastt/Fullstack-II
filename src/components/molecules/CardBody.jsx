import { Texto } from '../atoms/Texto';

function CardBody({ title, description, price }) {
  return (
    <>
      <Texto variant="h5" className="card-title fw-bold mb-2">{title}</Texto>
      <Texto variant="p" className="card-text text-muted mb-2">{description}</Texto>
      <Texto variant="p" className="fw-bold text-primary mb-3">
        ${price}
      </Texto>
    </>
  );
}

export default CardBody;