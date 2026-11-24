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
error. El carrito conserva su persistencia local. Los cambios del administrador
siguen siendo locales y todavía no se envían a la API.

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

Se implementaron **79 pruebas**: las 64 pruebas de componentes y entorno, más 10
casos de cuenta y 5 del carrito con login obligatorio, con la API simulada.

Los archivos estan organizados en `src/test/components`, separados en `atoms`, `molecules` y `organisms`.

Para ejecutar las pruebas:

```bash
npm test
```

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
