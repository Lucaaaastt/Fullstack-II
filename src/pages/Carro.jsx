import { useCart } from '../context/CartContext'
import ListaCarro from '../components/organisms/ListaCarro'
import ResumenCarro from '../components/molecules/ResumenCarro'
import { Texto } from '../components/atoms/Texto'
import '../../style/Carro.css'

export function Carro() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    total,
  } = useCart()

  const handleCheckout = () => {
    if (cartItems.length === 0) return
    alert('¡Gracias por tu compra! Procesando pedido...')
    clearCart()
  }

  return (
    <div className="carro-page" style={{ padding: '20px', color: '#fff' }}>
      <Texto className="titulo-carro">Carro de Compras</Texto>

      <div
        className="carro-contenido"
        style={{ display: 'flex', gap: '20px', marginTop: '20px' }}
      >
        <div style={{ flex: 2 }}>
          <ListaCarro
            items={cartItems}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onRemove={removeFromCart}
          />
        </div>

        {cartItems.length > 0 && (
          <div style={{ flex: 1 }}>
            <ResumenCarro
              total={total}
              onClear={clearCart}
              onCheckout={handleCheckout}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Carro