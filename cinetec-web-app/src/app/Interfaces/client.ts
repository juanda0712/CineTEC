export interface Client {
  cedula: string; // Clave primaria (PK)
  nombre: string;
  fechaNacimiento: Date;
  telefono: string;
  correo: string;
}
