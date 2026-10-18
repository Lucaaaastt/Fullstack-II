export function Campo({ id, nombre, etiqueta, tipo = 'text', autoComplete, value, onChange, placeholder}) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{etiqueta}</label>
      <input
        id={id}
        name={nombre}
        type={tipo}
        autoComplete={autoComplete}
        className="form-control"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
