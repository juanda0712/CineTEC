using CineTECApiBackend.Models;
using CineTECApiBackend.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace CineTECApiBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProyeccionController : ControllerBase
    {
        private readonly IJsonDataManager _jsonDataManager;

        public ProyeccionController(IJsonDataManager jsonDataManager)
        {
            _jsonDataManager = jsonDataManager;
        }

        [HttpGet("{originalName}/{branchName}")]
        public IActionResult GetProjectionsByMovie(string originalName, string branchName)
        {
            // Obtén todas las proyecciones desde tu repositorio o archivo JSON
            var allProjections = _jsonDataManager.LoadJsonFile<Proyeccion>("Proyecciones.json");

            // Filtra las proyecciones que coinciden con el NombreOriginal
            var projectionsByMovieAndBranch = allProjections
                .Where(projection => projection.Pelicula == originalName && projection.NombreSucursal == branchName);

            if (!projectionsByMovieAndBranch.Any())
            {
                return NotFound(); // Si no se encuentran proyecciones para la película, devuelve un 404.
            }

            return Ok(projectionsByMovieAndBranch);
        }
        [HttpGet]
        public IActionResult GetProjections()
        {
            // Obtén todas las proyecciones desde tu repositorio o archivo JSON
            var allProjections = _jsonDataManager.LoadJsonFile<Proyeccion>("Proyecciones.json");
            if (!allProjections.Any())
            {
                return NotFound(); 
            }
            return Ok(allProjections);
        }

        [HttpPost]
        public IActionResult AddProjection([FromBody] Proyeccion newProjection)
        {
            // Utiliza el servicio IJsonFileLoader para agregar la nueva proyeccion al archivo JSON
            _jsonDataManager.AddToJsonFile<Proyeccion>(newProjection, "Proyecciones.json");

            // Devuelve una respuesta HTTP 201 (Created) para indicar que la proyeccion se ha agregado con éxito
            return CreatedAtAction("AddProjection", newProjection);
        }

        [HttpDelete("{ProjectionID}")]
        public IActionResult DeleteProjection(int ProjectionID)
        {
            var allProjections = _jsonDataManager.LoadJsonFile<Proyeccion>("Proyecciones.json");

            // Utiliza la función EliminarObjeto para eliminar la proyeccion por su IDProyeccion
            _jsonDataManager.RemoveFromJsonFile<Proyeccion>(allProjections, p => p.IDProyeccion == ProjectionID, "Proyecciones.json");

            return NoContent();
        }

        [HttpPut("{ProjectionID}")]
        public IActionResult UpdateProjection(int ProjectionID, [FromBody] Proyeccion updatedProjection)
        {
            try
            {
                // Función de predicado para encontrar la proyeccion que coincida con el IDProyeccion
                Func<Proyeccion, bool> predicate = pr => pr.IDProyeccion == ProjectionID;

                // Utiliza la función UpdateJsonFile para actualizar la proyeccion
                _jsonDataManager.UpdateJsonFile(updatedProjection, predicate, "Proyecciones.json");

                return Ok(updatedProjection); // Devuelve la proyeccion actualizada en formato JSON
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al actualizar la proyeccion: {ex.Message}");
            }
        }

    }
}
