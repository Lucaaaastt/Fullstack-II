import { Boton } from '../atoms/Boton';
import { Texto } from '../atoms/Texto';

export function ResumenCarro({ total, onClear, onCheckout }) {
  return (
    <div className="resumen-carro">
      <Texto className="resumen-carro-titulo">Resumen</Texto>

      <div className="carro-total">
        <Texto>Total:</Texto>
        <Texto className="precio-total">${total}</Texto>
      </div>

      <Boton onClick={onCheckout} className="btn-pagar">
        Proceder al Pago
      </Boton>
      <Boton onClick={onClear} className="btn-vaciar">
        Vaciar Carro
      </Boton>
    </div>
  );
}

export default ResumenCarro;
