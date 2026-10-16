import '../../setupTests';
import { render, screen } from '@testing-library/react';
import { Texto } from '../../../components/atoms/Texto';

describe('Atomo Texto', () => {
  it('TEX-01: muestra el contenido en un parrafo por defecto', () => {
    // Sin indicar una etiqueta el texto debe ser un parrafo.
    render(<Texto>Texto de prueba</Texto>);
    expect(screen.getByText('Texto de prueba').tagName).toBe('P');
  });

  it('TEX-02: usa la etiqueta indicada en variant', () => {
    // Le paso h2 y compruebo que se muestre como subtitulo.
    render(<Texto variant="h2">Titulo de prueba</Texto>);
    expect(screen.getByRole('heading', { name: 'Titulo de prueba', level: 2 })).toBeTruthy();
  });

  it('TEX-03: aplica la clase y las propiedades adicionales', () => {
    // Reviso que lleguen los atributos que se pasan al atomo.
    render(<Texto className="texto-prueba" id="presentacion" title="Informacion">Contenido</Texto>);
    const texto = screen.getByText('Contenido');
    expect(texto.className).toContain('texto-prueba');
    expect(texto.id).toBe('presentacion');
    expect(texto.title).toBe('Informacion');
  });
});
