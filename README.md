[Tienda JDR — abrir aplicación](https://fullstack-2-jet.vercel.app/)

## Evaluacion 2 - Fullstack II

Proyecto de una tienda de videojuegos desarrollado con React y organizado mediante Atomic Design, con componentes reutilizables, navegacion entre paginas y pruebas unitarias.

## Integrantes

- Franco Pacheco
- Lucas Toledo
- Ignacio Acevedo

## Tecnologias utilizadas

- JavaScript
- HTML
- CSS
- React
- React Router
- Bootstrap y React Bootstrap
- Vite

## Catálogo y despliegue

El catálogo se obtiene de Spring Boot en Render, conectado a Neon. Las novedades
usan el atributo `novedad` del backend y las páginas muestran estados de carga y
error. El carrito conserva su persistencia local por usuario. La administración
crea, edita y elimina productos mediante la API y actualiza el catálogo solo cuando
el servidor confirma el cambio.

En Vercel, `vercel.json` redirige `/api/*` a Render antes de resolver las rutas de
React. Para usar este flujo, dejar `VITE_API_URL` sin configurar y volver a
desplegar. En desarrollo, Vite también redirige `/api` a Render.

Si se configura `VITE_API_URL`, debe contener solo la dirección base del backend
(`https://tienda-jdr-backend.onrender.com`), sin `/api`. En ese caso, Render debe
permitir el dominio del frontend mediante `CORS_ORIGINS`.

Para verificar el despliegue, abrir el dominio de producción indicado en Vercel:
`/api/productos` debe devolver JSON y `/productos` debe mostrar el catálogo.
Una redirección al inicio de sesión de Vercel corresponde a la protección del
despliegue; debe revisarse el dominio de producción y Deployment Protection.

## Usuario real

El registro crea un usuario con `POST /api/usuarios` y el login comprueba sus
credenciales con `POST /api/usuarios/login`. Al registrarse o entrar correctamente,
la cabecera muestra su nombre. La sesión se conserva al recargar y se puede cerrar
desde la cabecera.

En `localStorage.usuario` se guardan únicamente `id`, `nombre`, `correo` y `rol`
devueltos por la API, sin contraseña. El acceso visual al administrador utiliza
el rol del usuario. Esta identificación básica no crea una sesión autenticada
ni permisos en el servidor.

## Pruebas unitarias

Las pruebas utilizan Jasmine, Karma y React Testing Library.

La suite incluye pruebas de componentes, cuenta, carrito, comprobantes e historial,
con la API simulada para no modificar datos reales.

Los componentes se prueban en `src/test/components` y los recorridos en `src/test/pages`.
La suite actual contiene 95 pruebas, incluido el recorrido completo de registro,
login, carrito, venta, historial y comprobante con la API simulada.

Para ejecutar las pruebas:

```bash
npm test
```

## Compras

Una compra registrada abre `/detalle-compra/:id`, que consulta la venta en la API
y muestra su fecha, total y precios unitarios confirmados. El comprobante se puede
recargar y recuperar desde **Mis compras**. Los nombres e imágenes son los actuales
del producto; el precio unitario es el que quedó guardado en la venta.
Registrar una venta no procesa un pago bancario.

## Administración

Una cuenta con rol ADMIN puede abrir **Administrar productos** para agregar,
editar o eliminar juegos. El formulario incluye nombre, descripción, precio entero,
imagen y la opción de mostrarlo en novedades. DELETE desactiva el producto en la API.
Si falla una solicitud, el formulario y el catálogo conservan los datos anteriores.

## Prueba de entrega

Usar un entorno y cuentas de prueba para las operaciones que guardan datos:

1. Registrar una cuenta, cerrar sesión y volver a entrar.
2. Agregar juegos al carrito y registrar una compra.
3. Comprobar precios, cantidades y total del comprobante, recargar su URL y abrirlo desde Mis compras.
4. Con una cuenta ADMIN, crear un producto de prueba, editarlo, recargar y eliminarlo.
5. Comprobar que los errores de validación o conexión conservan el formulario y el carrito.

## Ejecutar el proyecto

Instalar las dependencias:

```bash
npm install
```

## ¿CÓMO PROBAR LA APP?

Para probar la aplicación completa, entra directamente a
[Tienda JDR en Vercel](https://fullstack-2-jet.vercel.app/).
Este es el enlace público de la tienda, sin necesidad de iniciar sesión en Vercel.
Desde ahí puedes revisar el inicio, el catálogo y los detalles de los productos.

Los datos siguen este recorrido:

**Neon (base de datos) → Render (backend) → Vercel (frontend).**

- **Vercel — aplicación:** [Abrir Tienda JDR](https://fullstack-2-jet.vercel.app/).
- **Render — API:** [Consultar productos](https://tienda-jdr-backend.onrender.com/api/productos)
  y [comprobar el estado del backend](https://tienda-jdr-backend.onrender.com/api/health).
- **Neon — base de datos:** [Abrir consola del proyecto](https://console.neon.tech/app/projects/hidden-heart-81293763/branches/br-lucky-sky-bbvwvem9).
  Requiere iniciar sesión y tener acceso al proyecto.
