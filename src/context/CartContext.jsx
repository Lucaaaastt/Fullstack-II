import { createContext, useContext, useState, useEffect } from 'react';
import { useListaPersistente } from './useListaPersistente';
import { obtenerUsuario } from './validacionesLogin'; // <--- NUEVO

const CartContext = createContext();

function CartProviderPorClave({ claveCarrito, children }) {
  const [cartItems, setCartItems] = useListaPersistente(claveCarrito, []);

  // Agregar un producto al carro
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Aumentar la cantidad
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Disminuir la cantidad (si llega a 0, se elimina)
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Eliminar un producto por completo
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Vaciar el carro
  const clearCart = () => setCartItems([]);

  // Calcular precio total
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function CartProvider({ children }) {
  const [usuario, setUsuario] = useState(obtenerUsuario);

  useEffect(() => {
    const actualizarUsuario = () => setUsuario(obtenerUsuario());
    window.addEventListener('sesion-actualizada', actualizarUsuario);
    window.addEventListener('storage', actualizarUsuario);
    return () => {
      window.removeEventListener('sesion-actualizada', actualizarUsuario);
      window.removeEventListener('storage', actualizarUsuario);
    };
  }, []);

  const claveCarrito = usuario ? `jdr-carrito-${usuario.id}` : 'jdr-carrito';

  return (
    <CartProviderPorClave key={claveCarrito} claveCarrito={claveCarrito}>
      {children}
    </CartProviderPorClave>
  );
}

// Hook personalizado para usar el carro en cualquier componente
export const useCart = () => useContext(CartContext);
