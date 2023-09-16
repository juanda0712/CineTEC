namespace CineTECApiBackend.Models
{
    public class Sala
    {
        public int IDSala { get; set; }
        public int NumFilas { get; set; }
        public int NumColumnas { get; set; }
        public string NombreSucursal { get; set; } //FK de Sala (PK de Sucursal)
    }
}
