import { cleanup } from '@testing-library/react';

// Limpio lo que se dibujó para que una prueba no afecte a la siguiente.
afterEach(() => cleanup());
