import { Card } from 'react-bootstrap';
import Image from '../atoms/Image';
import CardBody from '../molecules/CardBody';
import { Boton } from '../atoms/Boton';

function TarjetaProductoAdmin({ product }) {
    return (
        <Card className="h-100 shadow-sm bg-dark text-white border-secondary">
            <Image
                src={product.image}
                alt={product.name}
                className="card-img-top"
            />

            <Card.Body>
                <CardBody
                    title={product.name}
                    description={product.description}
                    price={product.price}
                />

                <div className="d-flex gap-2 mt-3">
                    <Boton>Editar</Boton>
                    <Boton>Eliminar</Boton>
                </div>
            </Card.Body>
        </Card>
    );
}

export default TarjetaProductoAdmin;