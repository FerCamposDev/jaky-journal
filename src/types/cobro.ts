export type PosibleVenta = {
  uid: string;
  nombre: string;
  totalPesos: number;
}

export type Cobro = {
  fecha: string | null
  cobroTotal: number,
  diezmo: number,
  sueldo: number,
  ahorro: number,
  dolarVenta: number,
  posiblesVentas: PosibleVenta[],
};
