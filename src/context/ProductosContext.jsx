import { createContext, useContext, useEffect, useState } from 'react';
import products from '../data/products';
import { adaptarProducto, guardarProducto as guardarEnApi, borrarProducto } from '../services/productos.js';

const ProductosContext = createContext({ productos: products });

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const API_URL = (import.meta.env?.VITE_API_URL || '').trim().replace(/\/+$/, '');
    const controlador = new AbortController();

    fetch(`${API_URL}/api/productos`, { signal: controlador.signal })
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('Error al obtener los productos del servidor');
        }
        if (!respuesta.headers.get('content-type')?.includes('application/json')) {
          throw new Error('La API devolvió HTML en lugar de productos. Revisa la URL y el proxy de /api.');
        }
        return respuesta.json();
      })
      .then((datosBackend) => {
        if (!Array.isArray(datosBackend)) {
          throw new Error('La respuesta de productos no es una lista');
        }

        const productosAdaptados = datosBackend.map(adaptarProducto);

        setProductos(productosAdaptados);
        setCargando(false);
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;
        console.error('No se pudo conectar con el backend:', error);
        setError('No se pudo cargar el catálogo. Intenta recargar la página.');
        setCargando(false);
      });
    return () => controlador.abort();
  }, []);

  async function guardarProducto(datos) {
    const guardado = await guardarEnApi(datos);
    setProductos(actuales => {
      const otros = actuales.filter(producto => producto.id !== guardado.id);
      return guardado.activo ? [...otros, guardado] : otros;
    });
    return guardado;
  }

  async function eliminarProducto(id) {
    await borrarProducto(id);
    setProductos(actuales => actuales.filter(producto => producto.id !== id));
  }

  return (
    <ProductosContext.Provider value={{ productos, setProductos, cargando, error, guardarProducto, eliminarProducto }}>
      {children}
    </ProductosContext.Provider>
  );
}

export const useProductos = () => useContext(ProductosContext);
