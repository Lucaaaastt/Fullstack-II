export function Campo({ id, nombre, etiqueta, tipo = 'text', autoComplete }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{etiqueta}</label>
      <input
        id={id}
        name={nombre}
        type={tipo}
        autoComplete={autoComplete}
        className="form-control"
      />
    </div>
  );
}
