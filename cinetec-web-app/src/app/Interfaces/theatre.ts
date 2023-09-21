export interface Theatre {
    idSala: number;
    numFilas: number;
    numColumnas: number;
    nombreSucursal: string; //FK de Sala (PK de Sucursal)
}
