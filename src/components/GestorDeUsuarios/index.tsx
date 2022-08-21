import { FormEvent, useEffect, useState } from 'react';
import { deleteUsuario, getUsuarios, postUsuario } from 'services/usuarios';
import { generarUsuario, Usuario } from 'types/usuario';

const GestorDeUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [nuevoUsuario, setNuevoUsuario] = useState(generarUsuario(''));

  useEffect(() => {
    async function init() {
      const listaUsuarios = await getUsuarios();
      setUsuarios(listaUsuarios);
    }
    init();
  }, []);

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

  return (
    <div style={{ border: 'solid 1px blue', margin: '10px' }}>
      <h3>Gestor De Usuarios</h3>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.docId}>
            {usuario.nombre}
            <button onClick={() => deleteUsuario(usuario.docId!)}>eliminar</button>
          </li>
        ))}
      </ul>

      <div>
        <form onSubmit={handleSubmit}>
          <input
            name="nombre"
            onChange={(e) => setNuevoUsuario({
              ...nuevoUsuario,
              nombre: e.target.value,
            })}
          />
          <input
            name="foto"
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
