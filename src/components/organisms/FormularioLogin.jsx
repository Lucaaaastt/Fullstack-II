import { FormularioCuenta } from './FormularioCuenta';

export function FormularioLogin({ mostrar, onCerrar, tipo = 'login', onAutenticado }) {
  return (
    <FormularioCuenta
      key={mostrar ? tipo : 'cerrado'}
      tipo={mostrar ? tipo : null}
      onCerrar={onCerrar}
      onAutenticado={onAutenticado}
    />
  );
}
