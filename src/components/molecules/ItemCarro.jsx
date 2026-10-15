import { Boton } from '../atoms/Boton'
import Image from '../atoms/Image'
import { Texto } from '../atoms/Texto'

export function ItemCarro({item, onIncrease, onDecrease, onRemove}){
    return(
        <div className='item-carro'>
            <Image src={item.image} alt={item.name || item.title} className="item-carro-img"/>

            <div className='item-carro-info'>
                <Texto className="item-carro-title">{item.name || item.title}</Texto>
                <Texto className="item-carro-price">${item.price}</Texto>
            </div>

            <div className="item-carro-control">
                <Boton onClick={() => onDecrease(item.id)}>-</Boton>
                <Texto className="cantidad-item">{item.quantity}</Texto>
                <Boton onClick={() => onIncrease(item.id)}>+</Boton>

                <Texto className="subtotal-item">${item.price * item.quantity}</Texto>

                <Boton onClick={() => onRemove(item.id)} className="btn-remove">
                    X
                </Boton>
            </div>
        </div>
    )
}

export default ItemCarro;