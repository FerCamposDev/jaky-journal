import React, { FC, useEffect, useState } from 'react';
import { PosibleVenta } from '.';

type Props = {
  posiblesVentas: PosibleVenta[];
  sueldo: number;
  valorDolar: number;
}

const SueldoParticionado: FC<Props> = (props) => {
  const { posiblesVentas, sueldo, valorDolar } = props;
  const [sueldoDividido, setSueldoDividido] = useState({
    pesos: 0,
    dolar: 0,
  });

  useEffect(() => {
    // eslint-disable-next-line max-len
    const totalVentaPesos = posiblesVentas.map((venta) => venta.totalPesos).reduce((prev, curr) => prev + curr, 0);
    const totalDolaresAVender = totalVentaPesos / valorDolar;
    setSueldoDividido({
      pesos: Math.floor(sueldo - totalDolaresAVender), // redondea al piso
      dolar: Math.ceil(totalDolaresAVender), // redondea arriba
    });
  }, [sueldo, posiblesVentas, valorDolar]);

  return (
    <div>
      <h3>Sueldo Particionado</h3>
      <span>{`Traer ${sueldoDividido.dolar} en dolar.`}</span>
      <span>{`Traer ${sueldoDividido.pesos} en pesos.`}</span>
    </div>
  );
};

export default SueldoParticionado;
