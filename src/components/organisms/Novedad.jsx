import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard.jsx';
import { Novedad } from '../../data/novedad.js';

export function Novedades() {
  return (
    <section className="py-4">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">🔥 Juegos Novedad</h2>
        </div>

        <Row xs={1} md={2} lg={3} className="g-4">
          {Novedad.map((game) => (
            <Col key={game.id}>
              <ProductCard product={game} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}