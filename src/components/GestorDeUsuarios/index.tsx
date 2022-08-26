import ModalVenta from 'components/ModalVenta';
import { useDB } from 'contexts/DBContext';
import { FormEvent, useState } from 'react';
import { deleteUsuario, postUsuario } from 'services/usuarios';
import { generarUsuario } from 'types/usuario';

const GestorDeUsuarios = () => {
  const { usuarios, esAdmin } = useDB();
  const [nuevoUsuario, setNuevoUsuario] = useState(generarUsuario(''));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (nuevoUsuario.nombre) {
      const resultado = await postUsuario(nuevoUsuario);
      // eslint-disable-next-line no-alert
      window.alert(resultado.msg);
      if (resultado.status) {
        setNuevoUsuario(generarUsuario(''));
      }
    }
  };

  if (!esAdmin) {
    return (
      <div style={{ border: 'solid 1px blue', margin: '10px' }}>
        <h3>Gestor De Usuarios</h3>
        <p>Su usuario no tiene permisos de administrador</p>
      </div>
    );
  }

  return (
    <div style={{ border: 'solid 1px blue', margin: '10px' }}>
      <h3>Gestor De Usuarios</h3>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.uid}>
            {usuario.nombre}
            <button onClick={() => deleteUsuario(usuario.uid)}>eliminar</button>
            <ModalVenta usuario={usuario} />
          </li>
        ))}
      </ul>

      <div>
        <form onSubmit={handleSubmit}>
          <input
            name="nombre"
            value={nuevoUsuario.nombre}
            onChange={(e) => setNuevoUsuario({
              ...nuevoUsuario,
              nombre: e.target.value,
            })}
          />
          <input
            name="foto"
            value={nuevoUsuario.foto}
            onChange={(e) => setNuevoUsuario({
              ...nuevoUsuario,
              foto: e.target.value,
            })}
          />
          <button type="submit">
            Guardar nuevo usuario
          </button>
        </form>
      </div>
    </div>
  );
};

export default GestorDeUsuarios;
