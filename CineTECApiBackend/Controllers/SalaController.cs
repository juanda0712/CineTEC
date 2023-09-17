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
    }
}
