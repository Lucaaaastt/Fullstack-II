
import { Carrusel } from '../components/organisms/Carrusel.jsx';
import { Novedades } from '../components/organisms/Novedad.jsx';

export function Inicio() {
  return (
    <main className="home-page pb-5">
      <Carrusel />
      <Novedades />
    </main>
  );
}

export default Inicio;
