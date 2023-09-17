using CineTECApiBackend.Models;
using CineTECApiBackend.Utilities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CineTECApiBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacturaController : ControllerBase
    {
        private readonly IJsonDataManager _jsonDataManager;

        public FacturaController(IJsonDataManager jsonDataManager)
        {
            _jsonDataManager = jsonDataManager;
        }


        [HttpGet]
        public IActionResult GetMovies()
        {
            // Carga los datos de los JSON en listas separadas
            var allBills = _jsonDataManager.LoadJsonFile<Factura>("Facturas.json");
            var allSeats = _jsonDataManager.LoadJsonFile<Asiento>("Asientos.json");

            // Verifica si alguna de las listas está vacía
            if (!allBills.Any() || !allSeats.Any())
            {
                return NotFound();
            }

            // Combina las películas y protagonistas por el campo NombreOriginal
            var billsWithSeats = allBills.Select(bill => new
            {
                IDFactura = bill.IDFactura,
                CedulaCliente = bill.CedulaCliente,
                NombreSucursal = bill.NombreSucursal,
                IDProyeccion = bill.IDProyeccion,
                IDSala = bill.IDSala,
                Impuesto = bill.Impuesto,
                Monto = bill.Monto,
                Fecha = bill.Fecha,
                Seats = allSeats
                    .Where(seat => seat.IDFactura == bill.IDFactura)
                    .Select(seat => seat.Numero)
                    .ToList()
            });

            return Ok(billsWithSeats);
        }
        [HttpPost()]
        public IActionResult AddBill([FromBody] Factura newBill)
        {
            // Utiliza el servicio IJsonFileLoader para agregar la nueva película al archivo JSON
            _jsonDataManager.AddToJsonFile<Factura>(newBill, "Facturas.json");

            // Devuelve una respuesta HTTP 201 (Created) para indicar que la película se ha agregado con éxito
            return CreatedAtAction("AddBill", newBill);
        }

        [HttpDelete("{id}")]
        public IActionResult DeletBill(int id)
        {
            var allBills = _jsonDataManager.LoadJsonFile<Factura>("Facturas.json");

            // Utiliza la función EliminarObjeto para eliminar la película por su nombreOriginal
            _jsonDataManager.RemoveFromJsonFile<Factura>(allBills, p => p.IDFactura == id, "Facturas.json");

            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateBill(int id, [FromBody] Factura updatedBill)
        {
            try
            {
                // Función de predicado para encontrar la película que coincida con el nombreOriginal
                Func<Factura, bool> predicate = p => p.IDFactura == id;

                // Utiliza la función UpdateJsonFile para actualizar la película
                _jsonDataManager.UpdateJsonFile(updatedBill, predicate, "Facturas.json");

                return Ok(updatedBill); // Devuelve la película actualizada en formato JSON
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al actualizar la Factura: {ex.Message}");
            }
        }
    }
}
