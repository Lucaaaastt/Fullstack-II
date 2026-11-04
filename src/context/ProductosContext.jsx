import { createContext, useContext } from 'react';
import products from '../data/products';
import { useListaPersistente } from './useListaPersistente';

const ProductosContext = createContext({ productos: products });

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useListaPersistente('jdr-productos', products);

  return (
    <ProductosContext.Provider value={{ productos, setProductos }}>
      {children}
    </ProductosContext.Provider>
  );
}

export const useProductos = () => useContext(ProductosContext);
