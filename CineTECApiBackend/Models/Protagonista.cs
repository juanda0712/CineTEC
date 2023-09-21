namespace CineTECApiBackend.Models
{
    public class Protagonista
    {
        public string NombreCompleto { get; set; }
        public string NombreOriginal { get; set; } //FK (PK de Pelicula)
    }
}
