// src/components/molecules/CardBody.jsx

import { Texto } from '../atoms/Texto';

function CardBody({ title, description, price }) {
  return (
    <div className="card-body-content text-center">
      <Texto variant="h5" className="product-card-title fw-bold">
        {title}
      </Texto>
      {description && (
        <Texto variant="p" className="text-light small my-2">
          {description}
        </Texto>
      )}

      <Texto variant="h4" className="text-danger fw-bold my-2">
        ${price}
      </Texto>
    </div>
  );
}

export default CardBody;
