export interface Movie {
  nombreOriginal: string;
  nombreComercial: string;
  imagen: string;
  director: string;
  clasificacion: string;
  duracion: number;
}

export interface Movie2 {
  nombreOriginal: string;
  nombreComercial: string;
  imagen: string;
  director: string;
  clasificacion: string;
  duracion: number;
  protagonistas: [];
}
