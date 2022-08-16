import { useDolar } from 'contexts/DolarContext';
import { useEffect, useState } from 'react';
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
    if (cobroTotal) {
      const sinDiezmo = cobroTotal * 0.90;
      setAhorro(sinDiezmo - sueldo);
    } else {
      setAhorro(0);
    }
  }, [cobroTotal]);

  return (
    <div>
      Dashboard
      <br />
      Total:&nbsp;
      <input type="text" defaultValue={cobroTotal} onChange={(e) => setCobroTotal(Number(e.target.value))} />
      <br />
      Sueldo:&nbsp;
      <input type="text" defaultValue={sueldo} onChange={(e) => setSueldo(Number(e.target.value))} />

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
      <button type="button" onClick={() => actualizarPrecio()}>{loading ? 'Actualizando' : 'Actualizar precio'}</button>

      <Ventas posiblesVentas={posiblesVentas} setPosiblesVentas={setPosiblesVentas} />
      <SueldoParticionado posiblesVentas={posiblesVentas} sueldo={sueldo} valorDolar={precio} />
    </div>
  );
};

export default Dashboard;
