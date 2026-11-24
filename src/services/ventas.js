import { solicitarApi } from './api.js';

function validarVenta(venta) {
  if (!Number.isSafeInteger(venta?.id) || venta.id <= 0
    || !Number.isSafeInteger(venta.usuarioId) || venta.usuarioId <= 0
    || !Number.isFinite(venta.total) || venta.total < 0
    || !Number.isFinite(Date.parse(venta.fecha)) || !Array.isArray(venta.detalles)) {
    throw new Error('El servidor no devolvió una venta válida.');
  }
  return venta;
}

export async function crearVenta(datos) {
  return validarVenta(await solicitarApi('/ventas', { method: 'POST', body: datos }));
}

export async function buscarVenta(id, signal) {
  return validarVenta(await solicitarApi(`/ventas/${id}`, { signal }));
}

export async function listarCompras(usuarioId, signal) {
  const ventas = await solicitarApi(`/ventas?usuarioId=${usuarioId}`, { signal });
  if (!Array.isArray(ventas)) throw new Error('El servidor no devolvió un historial válido.');
  return ventas.map(validarVenta);
}
