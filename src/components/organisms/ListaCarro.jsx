import ItemCarro from '../molecules/ItemCarro';
import { Texto } from '../atoms/Texto';

export function ListaCarro({ items, onIncrease, onDecrease, onRemove }) {
  if (!items || items.length === 0) {
    return (
      <div className="lista-carro-vacia">
        <Texto>CARRO VACIO</Texto>
      </div>
    );
  }

  return (
    <div className="lista-carro">
      {items.map((item) => (
        <ItemCarro
          key={item.id}
          item={item}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

export default ListaCarro;