using CineTECApiBackend.Models;
using CineTECApiBackend.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace CineTECApiBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalaController : ControllerBase
    {
        private readonly IJsonDataManager _jsonDataManager;

        public SalaController(IJsonDataManager jsonDataManager)
        {
            _jsonDataManager = jsonDataManager;
        }

        [HttpGet]
        public IActionResult Getheaters() 
        {
            var allTheaters = _jsonDataManager.LoadJsonFile<Sala>("Salas.json");
            if (!allTheaters.Any())
            {
                return NotFound();
            }
            return Ok(allTheaters);
        }
        [HttpGet("{branchName}")]
        public IActionResult GetProjectionsByMovie(string branchName)
        {
            // Obtén todas las proyecciones desde tu repositorio o archivo JSON
            var allTheaters = _jsonDataManager.LoadJsonFile<Sala>("Salas.json");

            // Filtra las proyecciones que coinciden con el NombreOriginal
            var theatersByBranch = allTheaters.Where(p => p.NombreSucursal == branchName);

            if (!theatersByBranch.Any())
            {
                return NotFound(); // Si no se encuentran salas para la sucursal, devuelve un 404.
            }

            return Ok(theatersByBranch);
        }

        [HttpPost]
        public IActionResult AddRoom([FromBody] Sala newRoom)
        {
            // Utiliza el servicio IJsonFileLoader para agregar la nueva sala al archivo JSON
            _jsonDataManager.AddToJsonFile<Sala>(newRoom, "Salas.json");

            // Devuelve una respuesta HTTP 201 (Created) para indicar que la sala se ha agregado con éxito
            return CreatedAtAction("AddRoom", newRoom);
        }

        [HttpDelete("{IDRoom}")]
        public IActionResult DeleteRoom(int IDRoom)
        {
            var allRooms = _jsonDataManager.LoadJsonFile<Sala>("Salas.json");

            // Utiliza la función EliminarObjeto para eliminar la sala por su ID
            _jsonDataManager.RemoveFromJsonFile<Sala>(allRooms, p => p.IDSala == IDRoom, "Salas.json");

            return NoContent();
        }

        [HttpPut("{IDRoom}")]
        public IActionResult UpdateRoom(int IDRoom, [FromBody] Sala UpdateRoom)
        {
            try
            {
                // Función de predicado para encontrar la sala que coincida con el ID
                Func<Sala, bool> predicate = p => p.IDSala == IDRoom;

                // Utiliza la función UpdateJsonFile para actualizar la sala
                _jsonDataManager.UpdateJsonFile(UpdateRoom, predicate, "Salas.json");

                return Ok(UpdateRoom); // Devuelve la sala actualizada en formato JSON
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al actualizar la sala: {ex.Message}");
            }
        }
    }
}
