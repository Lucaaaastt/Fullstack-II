import '../../setupTests';
import { render, screen } from '@testing-library/react';
import Image from '../../../components/atoms/Image';

const imagenPrueba = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

describe('Atomo Image', () => {
  it('IMG-01: usa la imagen y el texto alternativo recibidos', () => {
    // Uso una imagen pequena local a la prueba para no depender de internet.
    render(<Image src={imagenPrueba} alt="Logo de prueba" />);
    const imagen = screen.getByRole('img', { name: 'Logo de prueba' });
    expect(imagen.getAttribute('src')).toBe(imagenPrueba);
    expect(imagen.alt).toBe('Logo de prueba');
  });

  it('IMG-02: aplica la clase recibida', () => {
    // Compruebo que se pueda dar estilo desde afuera.
    render(<Image src={imagenPrueba} alt="Logo" className="imagen-prueba" />);
    expect(screen.getByRole('img', { name: 'Logo' }).className).toContain('imagen-prueba');
  });

  it('IMG-03: permite marcar una imagen como decorativa', () => {
    // Con alt vacio la imagen no debe anunciarse como contenido.
    const { container } = render(<Image src={imagenPrueba} alt="" />);
    expect(container.querySelector('img').getAttribute('alt')).toBe('');
    expect(screen.queryByRole('img')).toBeNull();
  });
});
