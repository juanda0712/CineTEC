namespace CineTECApiBackend.Models
{
    public class Pelicula
    {
        public string NombreOriginal { get; set; } // Clave primaria (PK)
        public string NombreComercial { get; set; }
        public string Imagen { get; set; }
        public string Director { get; set; }
        public string Clasificacion { get; set; }
        public int Duracion { get; set; }
    }
}
