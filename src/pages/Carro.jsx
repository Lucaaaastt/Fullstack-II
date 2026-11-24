import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate, Navigate } from 'react-router-dom'
import { obtenerUsuario } from '../context/validacionesLogin'
import { crearVenta } from '../services/ventas'
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
  const [error, setError] = useState('')
  const [usuario, setUsuario] = useState(obtenerUsuario)
  const navigate = useNavigate()

  useEffect(() => {
    const actualizarUsuario = () => setUsuario(obtenerUsuario())
    window.addEventListener('sesion-actualizada', actualizarUsuario)
    window.addEventListener('storage', actualizarUsuario)
    return () => {
      window.removeEventListener('sesion-actualizada', actualizarUsuario)
      window.removeEventListener('storage', actualizarUsuario)
    }
  }, [])

  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  const handleCheckout = async () => {
    if (cartItems.length === 0 || procesando) return

    const usuarioActual = obtenerUsuario()
    if (!usuarioActual) {
      navigate('/login')
      return
    }

    const ventaPayload = {
      usuarioId: usuarioActual.id,
      detalles: cartItems.map((item) => ({
        productoId: item.id,
        cantidad: item.quantity,
      })),
    }

    try {
      setProcesando(true)
      setError('')
      const venta = await crearVenta(ventaPayload)
      clearCart()
      navigate(`/detalle-compra/${venta.id}`)
    } catch (error) {
      setError(error.message)
    } finally {
      setProcesando(false)
    }
  }

  return (
    <div className="carro-page">
      <h1 className="titulo-carro">CARRO COMPRAS</h1>
      {error && <p role="alert">{error}</p>}

      {cartItems.length === 0 ? (
        /* VISTA SI EL CARRO ESTÁ VACÍO (SE CENTRA AUTOMÁTICAMENTE) */
        <div className="lista-carro-vacia">
          CARRO VACIO
        </div>
      ) : (
        /* VISTA DE 2 COLUMNAS SI HAY PRODUCTOS */
        <fieldset className="carro-contenido" disabled={procesando}>
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
              procesando={procesando}
            />
          </div>
        </fieldset>
      )}
    </div>
  )
}

export default Carro
