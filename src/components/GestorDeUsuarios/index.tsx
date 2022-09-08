import ModalVenta from 'components/ModalVenta';
import { useDB } from 'contexts/DBContext';
import { FormEvent, useState } from 'react';
import { postUsuario } from 'services/usuarios';
import { generarUsuario } from 'types/usuario';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/lab/LoadingButton';
// import { Input } from '@mui/material';
import TextField from '@mui/material/TextField';

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
    <div style={{
      border: 'solid 1px white', backgroundColor: '#58465a', margin: '10px', padding: '10px', fontFamily: 'cursive',
    }}
    >
      <h3>Gestor De Usuarios</h3>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.uid}>
            {usuario.nombre}
            <IconButton>
              <DeleteIcon />
            </IconButton>
            <ModalVenta usuario={usuario} />
          </li>
        ))}
      </ul>

      <div>
        <form onSubmit={handleSubmit}>
          {/* <Input

            name="nombre"
            variant="contained"
            color="secondary"
            value={nuevoUsuario.nombre}
            onChange={(e) => setNuevoUsuario({
              ...nuevoUsuario,
              nombre: e.target.value,
            })}
          /> */}
          <TextField
            id="filled-basic"
            label="Nombre"
            variant="filled"
            color="secondary"
            value={nuevoUsuario.nombre}
            onChange={(e) => setNuevoUsuario({
              ...nuevoUsuario,
              nombre: e.target.value,
            })}
          />
          <TextField
            id="filled-basic"
            label="Apellido"
            variant="filled"
            color="secondary"
            name="foto"
            value={nuevoUsuario.foto}
            onChange={(e) => setNuevoUsuario({
              ...nuevoUsuario,
              foto: e.target.value,
            })}
          />
          {/* <Input
            color="secondary"
            name="foto"
            value={nuevoUsuario.foto}
            onChange={(e) => setNuevoUsuario({
              ...nuevoUsuario,
              foto: e.target.value,
            })}
             /> */}
          <Button
            color="secondary"
            type="submit"
            variant="contained"
            sx={{ ml: 2, mt: 1, mb: 2 }}
          >
            Guardar nuevo usuario
          </Button>
        </form>
      </div>
    </div>
  );
};

export default GestorDeUsuarios;
