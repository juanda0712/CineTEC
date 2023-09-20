export interface Projection {
    idProyeccion: number; // Clave primaria (PK)
    dia: number;
    mes: number;
    año: number;
    horaInicio: Date;
    horaFin: Date;
    pelicula: String; //Fk (PK de Pelicula)
    nombreSucursal: String;
}