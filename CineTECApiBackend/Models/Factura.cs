namespace CineTECApiBackend.Models
{
    public class Factura
    {
        public int IDFactura { get; set; }
        public int CedulaCliente { get; set; }
        public string NombreSucursal { get; set; }
        public int IDProyeccion { get; set; }
        public int IDSala { get; set; }
        public int Impuesto { get; set; }
        public int Monto { get; set; }
        public DateTime Fecha { get; set; }
    }
}
