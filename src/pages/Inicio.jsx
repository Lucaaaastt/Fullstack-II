// src/pages/Inicio.jsx (o Home.jsx)
import React from 'react';
import { Carrusel } from '../components/organisms/Carrusel.jsx';
import { Novedades } from '../components/organisms/Novedad.jsx'; // Cambiado Novedad por Novedades

export function Inicio() {
  return (
    <main className="home-page pb-5">
      {/* 1. Impacto visual: Banner principal / Carrusel de destacados */}
      <Carrusel />

      {/* 2. Catálogo de productos: Grilla de novedades con tus ProductCards */}
      <Novedades />
    </main>
  );
}

export default Inicio;