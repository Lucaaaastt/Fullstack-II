import { useCart } from '../context/CartContext'
import ListaCarro from '../components/organisms/ListaCarro'
import ResumenCarro from '../components/molecules/ResumenCarro'
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
    <div className="carro-page">
      <h1 className="titulo-carro">CARRO COMPRAS</h1>

      {cartItems.length === 0 ? (
        /* VISTA SI EL CARRO ESTÁ VACÍO (SE CENTRA AUTOMÁTICAMENTE) */
        <div className="lista-carro-vacia">
          CARRO VACIO
        </div>
      ) : (
        /* VISTA DE 2 COLUMNAS SI HAY PRODUCTOS */
        <div className="carro-contenido">
          <div className="carro-lista-container">
            <ListaCarro
              items={cartItems}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onRemove={removeFromCart}
            />
          </div>

          <div className="carro-resumen-container">
            <ResumenCarro
              total={total}
              onClear={clearCart}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Carro