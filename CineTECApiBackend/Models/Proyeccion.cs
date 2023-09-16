namespace CineTECApiBackend.Models
{
    public class Proyeccion
    {
        public int IDProyeccion { get; set; } // Clave primaria (PK)
        public int Dia { get; set; }
        public int Mes { get; set; }
        public int Año { get; set; }
        public DateTime HoraInicio { get; set; }
        public DateTime HoraFin { get; set; }

        // Clave foránea (FK) para la relación con Película
        public string Pelicula { get; set; }
    }
}

