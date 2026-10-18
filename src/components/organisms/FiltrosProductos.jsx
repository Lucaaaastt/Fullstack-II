import SelectorText from '../molecules/SelectorText';
import { Texto } from '../atoms/Texto';
import { Campo } from '../atoms/Campo';

function FiltrosProductos() {
    return (
        <div className="filtros-productos">
            <Texto variant="h3">Filtros</Texto>

            <Campo
                id="buscar-producto"
                nombre="buscarProducto"
                etiqueta="Buscar producto"
            />

            <SelectorText
                titulo="Ordenar por"
                opciones={['Nombre', 'Precio ascendente', 'Precio descendente']}
            />
        </div>
    );
}

export default FiltrosProductos;