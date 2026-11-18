Tienda JDR (https://vercel.com/lt-92cb/fullstack-2)

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

## Pruebas unitarias

Las pruebas utilizan Jasmine, Karma y React Testing Library.

Se implementaron **64 pruebas**: tres casos para cada uno de los **21 componentes probados**, mas una prueba basica para comprobar el entorno de testing.

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


