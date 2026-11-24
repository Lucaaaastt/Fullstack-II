export async function solicitarApi(ruta, { body, ...opciones } = {}) {
  const base = (import.meta.env?.VITE_API_URL || '').trim().replace(/\/+$/, '');
  let respuesta;
  try {
    respuesta = await fetch(`${base}/api${ruta}`, {
      ...opciones,
      ...(body === undefined ? {} : {
        headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      }),
    });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new Error('No se pudo conectar con el servidor. Intenta nuevamente.', { cause: error });
  }
  if (respuesta.status === 204) return null;
  const datos = await respuesta.json().catch(() => null);
  if (!respuesta.ok) {
    throw new Error(datos?.detail || datos?.mensaje || 'No se pudo completar la solicitud. Revisa los datos e intenta nuevamente.');
  }
  if (datos === null) throw new Error('El servidor devolvió una respuesta inválida.');
  return datos;
}
