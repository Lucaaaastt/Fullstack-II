import { solicitarApi } from './api.js';

export function adaptarProducto(item) {
  if (!Number.isSafeInteger(item?.id) || item.id <= 0 || typeof item.nombre !== 'string'
    || !Number.isFinite(item.precio) || item.precio <= 0) {
    throw new Error('El servidor no devolvió un producto válido.');
  }
  return {
    id: item.id, name: item.nombre, description: item.descripcion || '',
    price: item.precio, image: item.imagenUrl || '/Image/red2.png',
    novedad: item.novedad === true, activo: item.activo !== false,
  };
}

export async function guardarProducto(producto) {
  const datos = await solicitarApi(`/productos${producto.id ? `/${producto.id}` : ''}`, {
    method: producto.id ? 'PUT' : 'POST',
    body: {
      nombre: producto.name.trim(), descripcion: producto.description.trim(),
      precio: producto.price, imagenUrl: producto.image.trim(),
      novedad: producto.novedad === true, activo: producto.activo !== false,
    },
  });
  return adaptarProducto(datos);
}

export function borrarProducto(id) {
  return solicitarApi(`/productos/${id}`, { method: 'DELETE' });
}
