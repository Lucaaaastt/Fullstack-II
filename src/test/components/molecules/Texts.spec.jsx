import '../../setupTests';
import { render, screen } from '@testing-library/react';
import { Texts } from '../../../components/molecules/Texts';

describe('Molecula Texts', () => {
  it('TXT-01: muestra todos los textos en el orden recibido', () => {
    // Paso una lista y reviso que no falte ningun texto.
    const items = [{ text: 'Primero' }, { text: 'Segundo' }, { text: 'Tercero' }];
    const { container } = render(<Texts items={items} />);
    const textos = Array.from(container.querySelectorAll('p')).map((elemento) => elemento.textContent);
    expect(textos).toEqual(['Primero', 'Segundo', 'Tercero']);
  });

  it('TXT-02: respeta la etiqueta y la clase de cada texto', () => {
    // Compruebo que se apliquen las propiedades de la lista.
    const items = [{ text: 'Titulo de prueba', variant: 'h2', className: 'titulo-prueba' }];
    render(<Texts items={items} />);
    const titulo = screen.getByRole('heading', { name: 'Titulo de prueba', level: 2 });
    expect(titulo.className).toContain('titulo-prueba');
  });

  it('TXT-03: no muestra contenido si no recibe textos', () => {
    // Una lista vacia debe dejar el contenedor vacio.
    const { container } = render(<Texts />);
    expect(container.childElementCount).toBe(0);
  });
});
