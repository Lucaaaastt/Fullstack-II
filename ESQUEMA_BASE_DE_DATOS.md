# Esquema de base de datos de Tienda JDR

## usuarios

**Atributos**

- `id` (`bigint`), clave primaria.
- `nombre` (`varchar`).
- `correo` (`varchar`), único.
- `contrasena_hash` (`varchar`).
- `rol` (`varchar`), `CLIENTE` o `ADMIN`.

**Conexión.** Un usuario puede tener varias ventas. `ventas.usuario_id` apunta a `usuarios.id`.

## productos

**Atributos**

- `id` (`bigint`), clave primaria.
- `nombre` (`varchar`).
- `descripcion` (`text`).
- `precio` (`bigint`), precio actual en pesos chilenos.
- `imagen_url` (`varchar`).
- `activo` (`boolean`), indica si el juego aparece en el catálogo.

**Conexión.** Un producto puede aparecer en varias compras. `detalle_venta.producto_id` apunta a `productos.id`.

## ventas

**Atributos**

- `id` (`bigint`), clave primaria.
- `usuario_id` (`bigint`), clave foránea.
- `fecha` (`timestamptz`).
- `total` (`bigint`), importe total en pesos chilenos.

**Conexiones**

- `ventas.usuario_id` → `usuarios.id`. Cada venta pertenece a un usuario.
- `detalle_venta.venta_id` → `ventas.id`. Cada venta tiene una o más líneas de detalle.

## detalle_venta

**Atributos**

- `id` (`bigint`), clave primaria.
- `venta_id` (`bigint`), clave foránea.
- `producto_id` (`bigint`), clave foránea.
- `cantidad` (`integer`).
- `precio_unitario` (`bigint`), precio en pesos chilenos al momento de la compra.

**Conexiones**

- `detalle_venta.venta_id` → `ventas.id`. Identifica la venta a la que pertenece la línea.
- `detalle_venta.producto_id` → `productos.id`. Identifica el juego comprado.
