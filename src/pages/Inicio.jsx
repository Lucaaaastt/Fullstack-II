
import { Carrusel } from '../components/organisms/Carrusel.jsx';
import { Novedades } from '../components/organisms/Novedad.jsx';
import { useProductos } from '../context/ProductosContext';

export function Inicio() {
  const { cargando, error } = useProductos();
  if (cargando) return <p role="status">Cargando novedades...</p>;
  if (error) return <p role="alert">{error}</p>;
  return (
    <main className="home-page pb-5">
      <Carrusel />
      <Novedades />
    </main>
  );
}

export default Inicio;
