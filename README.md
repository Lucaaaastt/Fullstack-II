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

## Persistencia local

Se agregó persistencia de las listas de productos y del carrito mediante
`localStorage`, para conservar los datos al recargar. Los cambios del administrador
se reflejan en el catálogo, el detalle y las novedades. Se mantiene la estructura
actual, sin backend ni dependencias nuevas. Los datos se guardan solo en el mismo
navegador y sitio.

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


