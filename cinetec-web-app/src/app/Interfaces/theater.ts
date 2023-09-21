export interface Theater {
  idSala: number;
  numFilas: number;
  numColumnas: number;
  nombreSucursal: string; //FK de Sala (PK de Sucursal)
}
