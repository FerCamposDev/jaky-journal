import { ChangeEvent, FC, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Usuario } from 'types/usuario';
import { Venta } from 'types/venta';
import { generarVenta } from 'utils/generadores';
import { useDolar } from 'contexts/DolarContext';
import dayjs from 'dayjs';

type Props = {
  usuario: Usuario;
}

const ModalVenta: FC<Props> = ({ usuario }) => {
  const [open, setOpen] = useState(false);
  const { precio } = useDolar();
  const [nuevaVenta, setNuevaVenta] = useState<Venta>(generarVenta(usuario, precio));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case 'fecha':
        return setNuevaVenta({
          ...nuevaVenta,
          fecha: dayjs(value).toISOString(),
        });
      case 'totalPesos':
        return setNuevaVenta({
          ...nuevaVenta,
          totalPesos: Number(value),
          cantidadUsd: Number(value) / nuevaVenta.valorDolar,
        });
      case 'valorDolar':
        return setNuevaVenta({
          ...nuevaVenta,
          valorDolar: Number(value),
          cantidadUsd: nuevaVenta.totalPesos / Number(value),
        });
      case 'billetes':
        return setNuevaVenta({
          ...nuevaVenta,
          billetes: value.split(',').map((elem) => Number(elem)),
        });
      case 'billetesRetorno':
        return setNuevaVenta({
          ...nuevaVenta,
          billetesRetorno: value.split(',').map((elem) => Number(elem)),
        });
      default: break;
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" size="small" onClick={handleClickOpen}>
        Agregar venta
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Agregar venta a&nbsp;
          {usuario.nombre}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            label="Día de venta"
            name="fecha"
            type="date"
            value={dayjs(nuevaVenta.fecha).format('YYYY-MM-DD')}
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            variant="outlined"
            type="number"
            name="totalPesos"
            label="Total en pesos"
            onChange={handleChange}
          />
          <TextField
            value={nuevaVenta.valorDolar}
            type="number"
            variant="outlined"
            name="valorDolar"
            label="Precio del dolar"
            onChange={handleChange}
          />
          <TextField
            disabled
            type="number"
            value={nuevaVenta.cantidadUsd}
            variant="outlined"
            label="Cantidad de USD"
          />
          <TextField
            fullWidth
            value={nuevaVenta.billetes.toString()}
            variant="outlined"
            name="billetes"
            label="Billetes (separados por coma)"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            value={nuevaVenta.billetesRetorno.toString()}
            variant="outlined"
            name="billetesRetorno"
            label="Vuelto (separados por coma)"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalVenta;
