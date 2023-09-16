using CineTECApiBackend.Models;
using CineTECApiBackend.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace CineTECApiBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SucursalPeliculaController : ControllerBase
    {
        private readonly IJsonDataManager _jsonDataManager;

        public SucursalPeliculaController(IJsonDataManager jsonDataManager)
        {
            _jsonDataManager = jsonDataManager;
        }

        [HttpPost]
        public IActionResult AddUnion([FromBody] SucursalPelicula newUnion)
        {
            _jsonDataManager.AddToJsonFile<SucursalPelicula>(newUnion, "SucursalPelicula.json");

            return CreatedAtAction("AddUnion", newUnion);
        }

        [HttpGet("{branchName}")]
        public IActionResult GetMoviesByBranch(string branchName)
        {
            var allUnions = _jsonDataManager.LoadJsonFile<SucursalPelicula>("SucursalPelicula.json");
            var allMovies = _jsonDataManager.LoadJsonFile<Pelicula>("Peliculas.json");
            var unionsByBranch = allUnions.Where(o => o.NombreSucursal == branchName);
            var moviesByBranch = allMovies
                .Where(movie => unionsByBranch.Any(union => union.NombrePelicula == movie.NombreOriginal))
                .ToList();
            if (!moviesByBranch.Any())
            {
                return NotFound(); 
            }

            return Ok(moviesByBranch);
        }
    }
}
