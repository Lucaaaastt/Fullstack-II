import '../../setupTests';
import { render, screen, fireEvent } from '@testing-library/react';
import { ResumenCarro } from '../../../components/molecules/ResumenCarro';

describe('Molecula ResumenCarro', () => {
  it('RCA-01: muestra el total recibido', () => {
    // Reviso que el resumen muestre el monto del carro.
    render(<ResumenCarro total={3600} />);
    expect(screen.getByText('Resumen')).toBeTruthy();
    expect(screen.getByText('$3600')).toBeTruthy();
  });

  it('RCA-02: llama a pagar sin vaciar el carro', () => {
    // Cada boton debe ejecutar solo su propia accion.
    const pagar = jasmine.createSpy('pagar');
    const vaciar = jasmine.createSpy('vaciar');
    render(<ResumenCarro total={3600} onCheckout={pagar} onClear={vaciar} />);
    fireEvent.click(screen.getByRole('button', { name: 'Proceder al Pago' }));
    expect(pagar).toHaveBeenCalledTimes(1);
    expect(vaciar).not.toHaveBeenCalled();
  });

  it('RCA-03: llama a vaciar sin iniciar el pago', () => {
    // Compruebo el boton para limpiar el carro.
    const pagar = jasmine.createSpy('pagar');
    const vaciar = jasmine.createSpy('vaciar');
    render(<ResumenCarro total={3600} onCheckout={pagar} onClear={vaciar} />);
    fireEvent.click(screen.getByRole('button', { name: 'Vaciar Carro' }));
    expect(vaciar).toHaveBeenCalledTimes(1);
    expect(pagar).not.toHaveBeenCalled();
  });
});
