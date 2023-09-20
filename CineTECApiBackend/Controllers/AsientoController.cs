using CineTECApiBackend.Models;
using CineTECApiBackend.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace CineTECApiBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AsientoController : ControllerBase
    {
        private readonly IJsonDataManager _jsonDataManager;

        public AsientoController(IJsonDataManager jsonDataManager)
        {
            _jsonDataManager = jsonDataManager;
        }

        [HttpGet("{iDTheater}/{iDProjection}")]
        public IActionResult GetSeats(int iDTheater, int iDProjection)
        {
            var allSeats = _jsonDataManager.LoadJsonFile<Asiento>("Asientos.json");

            // Filtrar los asientos que cumplan con las condiciones
            var FilteredSeats= allSeats
                .Where(asiento => asiento.IDSala == iDTheater && asiento.IDProyeccion == iDProjection)
                .ToList();

            return Ok(FilteredSeats);
        }

        [HttpPost]
        public IActionResult AddSeats([FromBody] List<Asiento> newSeats)
        {
            foreach (var newSeat in newSeats)
            {
                _jsonDataManager.AddToJsonFile<Asiento>(newSeat, "Asientos.json");
            }

            // Devuelve una respuesta HTTP 201 (Created) para indicar que los asientos se han agregado con éxito
            return CreatedAtAction("AddSeats", newSeats);
        }

        [HttpDelete("{NumberSeat}/{NumberSala}")]
        public IActionResult DeleteSeat(int NumberSeat, int NumberSala)
        {
            var allSeats = _jsonDataManager.LoadJsonFile<Asiento>("Asientos.json");

            // Utiliza la función EliminarObjeto para eliminar un asiento por su numero y número de sala
            _jsonDataManager.RemoveFromJsonFile<Asiento>(allSeats, p => p.Numero == NumberSeat && p.IDSala == NumberSala, "Asientos.json");

            return NoContent();
        }


        [HttpPut("{NumberSeat}/{NumberSala}")]
        public IActionResult UpdateSeat(int NumberSeat, int NumberSala, [FromBody] Asiento updatedSeat)
        {
            try
            {
                // Función de predicado para encontrar dl asiento que coincida con el numero
                Func<Asiento, bool> predicate = p => p.Numero == NumberSeat && p.IDSala == NumberSala;

                // Utiliza la función UpdateJsonFile para actualizar el asiento
                _jsonDataManager.UpdateJsonFile(updatedSeat, predicate, "Asientos.json");

                return Ok(updatedSeat); // Devuelve el asiento actualizado en formato JSON
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al actualizar el asiento: {ex.Message}");
            }
        }
    }
}
