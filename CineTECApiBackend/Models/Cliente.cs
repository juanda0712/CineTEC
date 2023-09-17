namespace CineTECApiBackend.Models
{
    public class Cliente
    {
        public int Cedula { get; set; } // Clave primaria (PK)
        public string Nombre { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public int Telefono { get; set; }
        public string Correo { get; set; }
    }
}
