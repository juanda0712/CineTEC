using CineTECApiBackend.Models;
using CineTECApiBackend.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace CineTECApiBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalaProyeccionController : ControllerBase
    {
        private readonly IJsonDataManager _jsonDataManager;

        public SalaProyeccionController(IJsonDataManager jsonDataManager)
        {
            _jsonDataManager = jsonDataManager;
        }

        [HttpPost]
        public IActionResult AddTheaterProjectionUnion([FromBody] SalaProyeccion newSPUnion)
        {
            _jsonDataManager.AddToJsonFile<SalaProyeccion>(newSPUnion, "SalaProyeccion.json");

            return CreatedAtAction("AddTheaterProjectionUnion", newSPUnion);
        }

        [HttpGet("{iDProjection}")]
        public IActionResult getTheatersByProjection(int iDProjection) 
        {
            var allTheaterProjectionUnions = _jsonDataManager.LoadJsonFile<SalaProyeccion>("SalaProyeccion.json");
            var allTheaters = _jsonDataManager.LoadJsonFile<Sala>("Salas.json");
            var unionsByProjections = allTheaterProjectionUnions.Where(o => o.IDProyeccion == iDProjection);
            var theatersByProjection = allTheaters
                .Where(theater => unionsByProjections.Any(union => union.IDSala == theater.IDSala))
                .ToList();

            return Ok(theatersByProjection);
        }
        [HttpGet]
        public IActionResult getUnions(int iDProjection)
        {
            var allTheaterProjectionUnions = _jsonDataManager.LoadJsonFile<SalaProyeccion>("SalaProyeccion.json");


            return Ok(allTheaterProjectionUnions);
        }

        [HttpDelete("{IDRoom}/{IDProjection}")]
        public IActionResult DeleteProjectionByRoom(int IDRoom, int IDProjection)
        {
            var allProjectionByRoom = _jsonDataManager.LoadJsonFile<SalaProyeccion>("SalaProyeccion.json");

            // Utiliza la función EliminarObjeto para eliminar una proyeccion de una sala
            _jsonDataManager.RemoveFromJsonFile<SalaProyeccion>(allProjectionByRoom, p => p.IDSala == IDRoom && p.IDProyeccion == IDProjection, "SalaProyeccion.json");

            return NoContent();
        }


        [HttpPut("{IDRoom}/{IDProjection}")]
        public IActionResult updatedProjectionByRoom(int IDRoom, int IDProjection, [FromBody] SalaProyeccion updatedProjectionByRoom)
        {
            try
            {
                // Función de predicado para encontrar la proyeccion que coincida con el nombre de la sala
                Func<SalaProyeccion, bool> predicate = p => p.IDSala == IDRoom && p.IDProyeccion == IDProjection;

                // Utiliza la función UpdateJsonFile para actualizar la proyeccion
                _jsonDataManager.UpdateJsonFile(updatedProjectionByRoom, predicate, "SalaProyeccion.json");

                return Ok(updatedProjectionByRoom); // Devuelve la proyeccion actualizada en formato JSON
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al actualizar la proyeccion: {ex.Message}");
            }
        }
    }
}
