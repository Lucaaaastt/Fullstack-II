import SelectorText from '../molecules/SelectorText';
import { Texto } from '../atoms/Texto';
import { Campo } from '../atoms/Campo';

function FiltrosProductos({ busqueda, setBusqueda, orden, setOrden}) {
    return (
        <div className="filtros-productos">
            <Texto variant="h3">Filtros</Texto>

            <Campo
                id="buscar-producto"
                nombre="buscarProducto"
                etiqueta="Buscar producto"
                placeholder="Nombre del producto"
                value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
            />

            <SelectorText
                titulo="Ordenar por: "
                opciones={[
                    'Nombre (A-Z)',
                    'Precio: menor a mayor',
                    'Precio: mayor a menor'
                ]}
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
            />
        </div>
    );
}

export default FiltrosProductos;