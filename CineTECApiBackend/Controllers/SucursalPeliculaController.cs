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
        [HttpGet]
        public IActionResult GetAll()
        {
            var allUnions = _jsonDataManager.LoadJsonFile<SucursalPelicula>("SucursalPelicula.json");
            
            if (!allUnions.Any())
            {
                return NotFound();
            }

            return Ok(allUnions);
        }

        [HttpDelete("{BranchName}/{MovieName}")]
        public IActionResult DeleteBranchByMovie(string BranchName, string MovieName)
        {
            var allMovieByBranch = _jsonDataManager.LoadJsonFile<SucursalPelicula>("SucursalPelicula.json");

            // Utiliza la función EliminarObjeto para eliminar una pelicula de una sucursal
            _jsonDataManager.RemoveFromJsonFile<SucursalPelicula>(allMovieByBranch, p => p.NombreSucursal == BranchName && p.NombrePelicula == MovieName, "SucursalPelicula.json");

            return NoContent();
        }


        [HttpPut("{BranchName}/{MovieName}")]
        public IActionResult updatedMovieByBranch(string BranchName, string MovieName, [FromBody] SucursalPelicula updatedMovieByBranch)
        {
            try
            {
                // Función de predicado para encontrar la pelicula que coincida con el nombre de la sucursal
                Func<SucursalPelicula, bool> predicate = p => p.NombreSucursal == BranchName && p.NombrePelicula == MovieName;

                // Utiliza la función UpdateJsonFile para actualizar la pelicula de una sucursal
                _jsonDataManager.UpdateJsonFile(updatedMovieByBranch, predicate, "SucursalPelicula.json");

                return Ok(updatedMovieByBranch); // Devuelve la pelicula actualizada en formato JSON
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al actualizar la pelicula: {ex.Message}");
            }
        }
    }
}
