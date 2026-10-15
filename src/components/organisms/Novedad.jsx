import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard.jsx';
import { Novedad } from '../../data/novedad.js';

export function Novedades() {
  return (
    <section className="py-4">
      <Container>
        <div className="catalog-header text-center mb-5">
          <h2 className="catalog-title">
            <span className="title-accent">NOVEDADES</span>
          </h2>
          <div className="title-glow-line"></div>
        </div>

        <Row xs={1} sm={2} md={3} className="g-4">
          {Novedad.map((game) => (
            <Col key={game.id} className="d-flex align-items-stretch">
              <ProductCard product={game} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}