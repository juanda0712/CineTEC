namespace CineTECApiBackend.Models
{
    public class Asiento
    {
        public int Numero {  get; set; } // Primary key PK
        public string Estado { get; set; }
        public int IDSala { get; set; } //FK de Asiento (PK de Sala)
        public int IDProyeccion { get; set; } //FK de Asiento (PK de Proyeccion)
        public int IDFactura { get; set; } //FK de Asiento (PK de Factura)
    }
}