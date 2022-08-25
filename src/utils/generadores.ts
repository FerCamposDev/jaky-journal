import dayjs from 'dayjs';
import { Usuario } from 'types/usuario';
import { Venta } from 'types/venta';

export const generarVenta = (usuario: Usuario, precio?: number): Venta => ({
  comprador: usuario.nombre,
  fecha: dayjs().toISOString(),
  totalPesos: 0,
  valorDolar: precio || 0,
  cantidadUsd: 0,
  billetes: [],
  billetesRetorno: [],
});
