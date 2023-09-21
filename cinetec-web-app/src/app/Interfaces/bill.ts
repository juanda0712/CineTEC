export interface Bill {
  idFactura: number;
  cedulaCliente: string;
  nombreSucursal: string;
  idProyeccion: number;
  idSala: number;
  impuesto: number;
  monto: number;
  fecha: Date;
  seats: number[];
}
export interface Bill2 {
  idFactura: number;
  cedulaCliente: string;
  nombreSucursal: string;
  idProyeccion: number;
  idSala: number;
  impuesto: number;
  monto: number;
  fecha: Date;
}
export interface Seat {
  numero: number;
  estado: string;
  idSala: number;
  idProyeccion: number;
  idFactura: number;
}
