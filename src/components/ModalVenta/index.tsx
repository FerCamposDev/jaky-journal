import {
  ChangeEvent, FC, useEffect, useState,
} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Usuario } from 'types/usuario';
import { Venta } from 'types/venta';
import { generarVenta } from 'utils/generadores';
import { useDolar } from 'contexts/DolarContext';
import dayjs from 'dayjs';
import lodash from 'lodash';
import SeleccionadorBilletes from './SeleccionadorBilletes';

type Props = {
  usuario: Usuario;
}

const ModalVenta: FC<Props> = ({ usuario }) => {
  const [open, setOpen] = useState(false);
  const { precio } = useDolar();
  const [nuevaVenta, setNuevaVenta] = useState<Venta>(generarVenta(usuario, precio));
  const [billetes, setBilletes] = useState<number[]>([]);
  const [billetesRetorno, setBilletesRetorno] = useState<number[]>([]);

  useEffect(() => {
    setNuevaVenta({
      ...nuevaVenta,
      billetes,
      billetesRetorno,
    });
  }, [billetes, billetesRetorno]);

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
      default: break;
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const guardarVenta = async () => {
    const {
      cantidadUsd, comprador, totalPesos, valorDolar,
    } = nuevaVenta;
    const sumaBilletes = lodash.sum(billetes);
    const sumaVuelto = lodash.sum(billetesRetorno);
    if (!cantidadUsd || !comprador || !valorDolar) {
      alert('faltan datos');
    }
    if (sumaBilletes - sumaVuelto !== Math.round(totalPesos / valorDolar)) {
      console.log('sumaBilletes -sumaVuelto', sumaBilletes - sumaVuelto);
      console.log('Math.round(totalPesos/valorDolar) :>> ', Math.round(totalPesos / valorDolar));
      alert('los billetes no son igual que el total');
    }
    try {
      // await postVenta(nuevaVenta);
    } catch (error) {
      console.log('error', error);
    }
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
          <SeleccionadorBilletes placeholder="Seleccione los billetes" billetes={billetes} setBilletes={setBilletes} />
          <SeleccionadorBilletes placeholder="Seleccione los billetes de vuelto" billetes={billetesRetorno} setBilletes={setBilletesRetorno} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={guardarVenta} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalVenta;
