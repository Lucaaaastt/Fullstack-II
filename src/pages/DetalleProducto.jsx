import { Container, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Texto } from "../components/atoms/Texto";
import products from "../data/products";
import Image from "../components/atoms/Image";

function ProductoDetalle(){
  const { id } = useParams();
  const producto = products.find((p) => p.id === parseInt(id));
  
  if (!producto){
    return (
      <Container>
        <h1>PRODUCTO NO ENCONTRADO!</h1>
      </Container>
    )
  }

  return (
    <Container className="my-5">
      <Card>
        <Image src={producto.image} alt={producto.name} className="card-img-top"/>
        <Card.Body>
          <Texto variant="h2">{producto.name}</Texto>
          <Texto variant="p">{producto.description}</Texto>
          <Texto variant="h4">${producto.price}</Texto>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ProductoDetalle