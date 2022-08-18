import { postUsuario } from 'services/usuarios';
import { generarUsuario } from 'types/usuario';

const Usuarios = () => (
  <div>
    Usuarios
    <button type="button" onClick={() => postUsuario(generarUsuario('nuevo usuario'))}>
      Guardar usuario
    </button>
  </div>
);

export default Usuarios;
