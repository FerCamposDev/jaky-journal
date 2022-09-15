import { useDolar } from 'contexts/DolarContext';
import { useEffect, useState } from 'react';
import Button from '@mui/lab/LoadingButton';
import { Input } from '@mui/material';
import SueldoParticionado from './SueldoParticionado';
import Ventas from './Ventas';

export type PosibleVenta = {
  id: string;
  nombre: string;
  totalPesos: number;
}

const Dashboard = () => {
  const { precio, actualizarPrecio, loading } = useDolar();
  const [cobroTotal, setCobroTotal] = useState(4000);
  const [sueldo, setSueldo] = useState(800);
  const [ahorro, setAhorro] = useState(0);
  const [posiblesVentas, setPosiblesVentas] = useState<PosibleVenta[]>([]);

  useEffect(() => {
    if (cobroTotal && cobroTotal > sueldo) {
      const sinDiezmo = cobroTotal * 0.90;
      setAhorro(sinDiezmo - sueldo);
    } else {
      setAhorro(0);
    }
  }, [cobroTotal, sueldo]);

  return (
    <div style={{
      border: 'solid 1px white', backgroundColor: '#58465a', margin: '10px', padding: '10px', fontFamily: 'cursive',
    }}
    >
      <h2 style={{ textTransform: 'uppercase' }}> Dashboard </h2>
      <br />
      Total:&nbsp;
      <Input type="text" color="secondary" defaultValue={cobroTotal} onChange={(e) => setCobroTotal(Number(e.target.value))} />
      <br />
      Sueldo:&nbsp;
      <Input type="text" color="secondary" defaultValue={sueldo} onChange={(e) => setSueldo(Number(e.target.value))} />
      <br />

      <span>
        Diezmo:&nbsp;
        {cobroTotal * 0.1}
      </span>
      <br />
      <span>
        Ahorro:&nbsp;
        {ahorro}
      </span>
      <br />
      <span>
        Dolar Venta:&nbsp;
        {precio}
      </span>
      <Button
        size="small"
        color="success"
        variant="contained"
        sx={{ ml: 2, mt: 1, mb: 2 }}
        type="button"
        onClick={() => actualizarPrecio()}
      >
        {loading ? 'Actualizando' : 'Actualizar precio'}
      </Button>

      <Ventas posiblesVentas={posiblesVentas} setPosiblesVentas={setPosiblesVentas} />
      <SueldoParticionado posiblesVentas={posiblesVentas} sueldo={sueldo} valorDolar={precio} />
    </div>
  );
};

export default Dashboard;
