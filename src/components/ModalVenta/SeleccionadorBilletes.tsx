/* eslint-disable react/no-array-index-key */
import { Chip, Stack } from '@mui/material';
import { Dispatch, FC, SetStateAction } from 'react';
import lodash from 'lodash';

type Props = {
  placeholder: string;
  billetes: number[];
  setBilletes: Dispatch<SetStateAction<number[]>>;
}

const BILLETES = [1, 5, 10, 20, 50, 100];

const SeleccionadorBilletes: FC<Props> = ({ billetes, setBilletes, placeholder }) => {
  const eliminarBillete = (indice: number) => {
    const copia = [...billetes];
    copia.splice(indice, 1);
    setBilletes(copia);
  };

  const agregarBillete = (valor: number) => {
    const copia = [...billetes];
    copia.push(valor);
    setBilletes(copia);
  };

  return (
    <div>
      <span>{placeholder}</span>
      <span>
        (Total:
        {' '}
        {lodash.sum(billetes)}
        )
      </span>
      <Stack direction="row" spacing={1}>
        {billetes.map((billete, index) => <Chip key={index + billete} label={billete} variant="outlined" onDelete={() => eliminarBillete(index)} />)}
      </Stack>
      <Stack direction="row" spacing={1}>
        {BILLETES.map((billete) => <Chip key={billete} label={billete} variant="outlined" onClick={() => agregarBillete(billete)} />)}
      </Stack>
    </div>
  );
};

export default SeleccionadorBilletes;
