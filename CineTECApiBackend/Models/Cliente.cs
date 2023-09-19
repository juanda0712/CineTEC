namespace CineTECApiBackend.Models
{
    public class Cliente
    {
        public string Cedula { get; set; } // Clave primaria (PK)
        public string Nombre { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string Telefono { get; set; }
        public string Correo { get; set; }
    }
}
