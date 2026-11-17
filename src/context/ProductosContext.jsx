import { createContext, useContext, useEffect, useState } from 'react';
import products from '../data/products';

const ProductosContext = createContext({ productos: products });

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState(products);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || '';

    fetch(`${API_URL}/api/productos`)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('Error al obtener los productos del servidor');
        }
        return respuesta.json();
      })
      .then((datosBackend) => {
        console.log('Productos recibidos desde el backend:', datosBackend);

        const productosAdaptados = datosBackend.map((item) => ({
          id: item.id,
          name: item.nombre,
          description: item.descripcion || 'Sin descripción disponible',
          price: item.precio,
          image: item.imagenUrl || '/Image/red2.png',
        }));

        setProductos(productosAdaptados);
      })
      .catch((error) => {
        console.error('No se pudo conectar con el backend:', error);
      });
  }, []);

  return (
    <ProductosContext.Provider value={{ productos, setProductos }}>
      {children}
    </ProductosContext.Provider>
  );
}

export const useProductos = () => useContext(ProductosContext);