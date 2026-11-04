import { useEffect, useState } from 'react';

// Las listas siguen siendo estado de React; localStorage conserva una copia.
export function useListaPersistente(clave, listaInicial) {
  const [lista, setLista] = useState(() => {
    try {
      const guardada = JSON.parse(localStorage.getItem(clave));
      return Array.isArray(guardada) ? guardada : listaInicial;
    } catch {
      return listaInicial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(clave, JSON.stringify(lista));
    } catch {
      // Si el navegador no permite guardar, la lista funciona en memoria.
    }
  }, [clave, lista]);

  return [lista, setLista];
}
