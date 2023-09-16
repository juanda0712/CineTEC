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

        [HttpGet("{originalName}")]
        public IActionResult GetProjectionsByMovie(string originalName)
        {
            // Obtén todas las proyecciones desde tu repositorio o archivo JSON
            var allProjections = _jsonDataManager.LoadJsonFile<Proyeccion>("Proyecciones.json");

            // Filtra las proyecciones que coinciden con el NombreOriginal
            var projectionsByMovie = allProjections.Where(p => p.Pelicula == originalName);

            if (!projectionsByMovie.Any())
            {
                return NotFound(); // Si no se encuentran proyecciones para la película, devuelve un 404.
            }

            return Ok(projectionsByMovie);
        }

    }
}
