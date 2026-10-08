import React from 'react';
import { render } from '@testing-library/react';
import { Button } from '../components/atoms/Button';

describe('Button Component', () => {
  it('renderiza el botón correctamente', () => {
    const { getByText } = render(<Button>Haz click</Button>);

    const button = getByText('Haz click');

    expect(button).toBeTruthy();
  });

  it('aplica los props correctamente', () => {
    const { getByText } = render(
      <Button className="btn-primary">
        Haz click
      </Button>
    );

    const button = getByText('Haz click');

    expect(button.className).toContain('btn-primary');
  });
});