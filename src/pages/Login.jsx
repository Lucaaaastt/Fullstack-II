import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import { Boton } from '../components/atoms/Boton';
import { DatosFormulario } from '../components/molecules/DatosFormulario';
import { validarCuenta } from '../context/validacionesCuenta';
import { guardarUsuario } from '../context/validacionesLogin';
import { iniciarSesion, registrarUsuario } from '../services/usuarios';

export function Login() {
  const [modo, setModo] = useState('login'); // 'login' | 'registro'
  const [mensaje, setMensaje] = useState('');
  const [enviando, setEnviando] = useState(false);
  const navegar = useNavigate();

  const registro = modo === 'registro';

  function cambiarModo(nuevoModo) {
    if (enviando) return;
    setModo(nuevoModo);
    setMensaje('');
  }

  async function enviar(evento) {
    evento.preventDefault();
    if (enviando) return;

    const campos = new FormData(evento.currentTarget);
    const datos = {
      nombre: campos.get('nombre') || '',
      correo: campos.get('correo') || '',
      contrasena: campos.get('contrasena') || '',
      confirmarContrasena: campos.get('confirmarContrasena') || '',
    };

    const error = validarCuenta(datos, registro);
    if (error) {
      setMensaje(error);
      return;
    }

    setEnviando(true);
    setMensaje(registro ? 'Creando cuenta...' : 'Iniciando sesión...');

    try {
      const usuario = await (registro ? registrarUsuario(datos) : iniciarSesion(datos));
      guardarUsuario(usuario);
      navegar('/');
    } catch (error) {
      setMensaje(error.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card
        className="cuenta-panel text-white p-4 shadow-lg border-secondary"
        style={{ width: '100%', maxWidth: '460px' }}
        data-bs-theme="dark"
      >
        {/* Pestañas para alternar entre Iniciar sesión y Registrarse */}
        <div className="d-flex gap-2 mb-4">
          <Boton
            className={`header-button flex-fill ${!registro ? 'header-button-register' : ''}`}
            onClick={() => cambiarModo('login')}
            disabled={enviando}
          >
            Iniciar sesión
          </Boton>
          <Boton
            className={`header-button flex-fill ${registro ? 'header-button-register' : ''}`}
            onClick={() => cambiarModo('registro')}
            disabled={enviando}
          >
            Registrarse
          </Boton>
        </div>

        <h2 className="h4 mb-3 text-center">
          {registro ? 'Crear una cuenta' : 'Bienvenido de vuelta'}
        </h2>

        <form noValidate onSubmit={enviar} onInput={() => { if (!enviando) setMensaje(''); }}>
          <fieldset disabled={enviando}>
            <DatosFormulario key={modo} registro={registro} />

            <div className="d-grid mt-3">
              <Boton
                type="submit"
                className="header-button header-button-register py-2"
                disabled={enviando}
              >
                {registro ? 'Registrarse' : 'Ingresar'}
              </Boton>
            </div>
          </fieldset>

          {mensaje && (
            <p role="status" className="mt-3 mb-0 text-center">
              {mensaje}
            </p>
          )}
        </form>
      </Card>
    </Container>
  );
}

export default Login;