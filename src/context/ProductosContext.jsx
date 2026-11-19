import { createContext, useContext, useEffect, useState } from 'react';
import products from '../data/products';

const ProductosContext = createContext({ productos: products });

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const API_URL = (import.meta.env.VITE_API_URL || '').trim().replace(/\/+$/, '');
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

        const productosAdaptados = datosBackend.map((item) => ({
          id: item.id,
          name: item.nombre,
          description: item.descripcion || 'Sin descripción disponible',
          price: item.precio,
          image: item.imagenUrl || '/Image/red2.png',
          novedad: item.novedad === true,
        }));

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

  return (
    <ProductosContext.Provider value={{ productos, setProductos, cargando, error }}>
      {children}
    </ProductosContext.Provider>
  );
}

export const useProductos = () => useContext(ProductosContext);
