import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate, Navigate } from 'react-router-dom'
import { obtenerUsuario } from '../context/validacionesLogin'
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
      const resumenCompra = {
        idVenta: data?.id,
        fecha:new Date().toLocaleString('es-CL'),
        items: [...cartItems],
        total: total,
      }

      clearCart()
      navigate('/detalle-compra', { state: { compra:resumenCompra } })
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