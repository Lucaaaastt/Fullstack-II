import { useState } from 'react'
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

  const [procesando, setProcesando] = useState(false)

  const handleCheckout = async () => {
    if (cartItems.length === 0 || procesando) return

    // Si hay un usuario guardado en localStorage con id, lo usa; si no, usa el ID 1 por defecto
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario') || 'null')
    const usuarioId = usuarioGuardado?.id || 1

    const ventaPayload = {
      usuarioId: usuarioId,
      detalles: cartItems.map((item) => ({
        productoId: item.id,
        cantidad: item.quantity,
      })),
    }

    try {
      setProcesando(true)

      const respuesta = await fetch('/api/ventas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ventaPayload),
      })

      const data = await respuesta.json().catch(() => null)

      if (!respuesta.ok) {
        const mensajeError =
          data?.detail || data?.mensaje || 'No se pudo registrar la compra'
        throw new Error(mensajeError)
      }

      console.log('Venta registrada en el backend:', data)
      alert(`¡Compra realizada con éxito! N° de orden: ${data.id}`)
      clearCart()
    } catch (error) {
      console.error('Error al procesar la compra:', error)
      alert(`Error al procesar la compra: ${error.message}`)
    } finally {
      setProcesando(false)
    }
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