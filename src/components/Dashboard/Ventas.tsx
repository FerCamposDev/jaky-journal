import {
  ChangeEvent,
  Dispatch, FC, SetStateAction, useState,
} from 'react';
import uniqid from 'uniqid';
import { PosibleVenta } from '.';

type Props = {
  posiblesVentas: PosibleVenta[],
  setPosiblesVentas: Dispatch<SetStateAction<PosibleVenta[]>>
}

const Ventas: FC<Props> = (props) => {
  const { posiblesVentas, setPosiblesVentas } = props;
  const [ventaEnEdicion, setVentaEnEdicion] = useState<PosibleVenta>();

  const agregarVenta = () => {
    const nuevaVenta: PosibleVenta = {
      id: uniqid(),
      nombre: '',
      totalPesos: 0,
    };
    const ventas = [...posiblesVentas];
    ventas.push(nuevaVenta);
    setPosiblesVentas(ventas);
    setVentaEnEdicion(nuevaVenta);
  };

  const handlerEdicion = (evento: ChangeEvent<HTMLInputElement>) => {
    const nombreInput = evento.target.name;
    if (ventaEnEdicion) {
      if (nombreInput === 'nuevoNombre') {
        setVentaEnEdicion({
          ...ventaEnEdicion,
          nombre: evento.target.value,
        });
      } else { // es nuevoValorPesos
        setVentaEnEdicion({
          ...ventaEnEdicion,
          totalPesos: Number(evento.target.value),
        });
      }
    }
  };

  const guardarEdicion = () => {
    const ventas = [...posiblesVentas];
    const indice = ventas.findIndex((venta) => venta.id === ventaEnEdicion?.id);
    if (indice !== undefined && ventaEnEdicion) {
      ventas.splice(indice, 1, ventaEnEdicion); // reemplaza posicion de indice por la venta editada
      setPosiblesVentas(ventas);
      setVentaEnEdicion(undefined);
    }
  };

  const eliminarVenta = (id: string) => {
    const ventas = [...posiblesVentas];
    const indice = ventas.findIndex((venta) => venta.id === id);
    // splice borra elementos asi => (lugar donde empieza a borrar, cantidad de elementos a borrar)
    ventas.splice(indice, 1);
    setPosiblesVentas(ventas);
  };

  const mostrarVenta = (venta: PosibleVenta) => (
    <div>
      <span>{`Cliente: ${venta.nombre}`}</span>
      <span>{`Total Pesos: $${venta.totalPesos}`}</span>
      <button
        type="button"
        onClick={() => setVentaEnEdicion(venta)}
      >
        Editar
      </button>
      <button
        type="button"
        onClick={() => eliminarVenta(venta.id)}
      >
        Eliminar
      </button>
    </div>
  );

  const mostrarEdicionVenta = () => (
    <div>
      <span>Cliente: </span>
      <input value={ventaEnEdicion?.nombre} name="nuevoNombre" onChange={handlerEdicion} />
      <span>Total Pesos: $</span>
      <input value={ventaEnEdicion?.totalPesos} name="nuevoTotal" onChange={handlerEdicion} />
      <button
        type="button"
        onClick={guardarEdicion}
        disabled={!ventaEnEdicion?.nombre && !ventaEnEdicion?.totalPesos}
      >
        Guardar
      </button>
      <button
        type="button"
        onClick={() => eliminarVenta(ventaEnEdicion!.id)}
      >
        Eliminar
      </button>
    </div>
  );

  return (
    <div>
      <h3>Posibles Ventas</h3>
      <ul>
        {posiblesVentas.map((posibleVenta) => (
          <li key={posibleVenta.id}>
            {ventaEnEdicion && ventaEnEdicion.id === posibleVenta.id ? (
              mostrarEdicionVenta()
            ) : (
              mostrarVenta(posibleVenta)
            )}
          </li>
        ))}
      </ul>
      <button type="button" onClick={agregarVenta} disabled={ventaEnEdicion !== undefined}>Agregar</button>
    </div>
  );
};

export default Ventas;
