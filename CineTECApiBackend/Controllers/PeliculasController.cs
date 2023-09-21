using Microsoft.AspNetCore.Mvc;
using CineTECApiBackend.Models;
using CineTECApiBackend.Utilities;
using System.Text.Json;


namespace CineTECApiBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeliculasController : ControllerBase
    {
        private readonly IJsonDataManager _jsonDataManager;

        public PeliculasController(IJsonDataManager jsonDataManager)
        {
            _jsonDataManager = jsonDataManager;
        }

        [HttpGet]
        public IActionResult GetMovies()
        {
            // Carga los datos de los JSON en listas separadas
            var allMovies = _jsonDataManager.LoadJsonFile<Pelicula>("Peliculas.json");
            var allActors = _jsonDataManager.LoadJsonFile<Protagonista>("Protagonistas.json");

            // Verifica si alguna de las listas está vacía
            if (!allMovies.Any() || !allActors.Any())
            {
                return NotFound();
            }

            // Combina las películas y protagonistas por el campo NombreOriginal
            var moviesWithActors = allMovies.Select(movie => new
            {
                NombreOriginal = movie.NombreOriginal,
                NombreComercial = movie.NombreComercial,
                Imagen = movie.Imagen,
                Director = movie.Director,
                Clasificacion = movie.Clasificacion,
                Duracion = movie.Duracion,
                Protagonistas = allActors
                    .Where(actor => actor.NombreOriginal == movie.NombreOriginal)
                    .Select(actor => actor.NombreCompleto)
                    .ToList()
            });

            return Ok(moviesWithActors);
        }


        [HttpGet("{originalName}")]
        public IActionResult GetSpecificMovie(string originalName)
        {
            // Carga los datos de los JSON en listas separadas
            var allMovies = _jsonDataManager.LoadJsonFile<Pelicula>("Peliculas.json");
            var allActors = _jsonDataManager.LoadJsonFile<Protagonista>("Protagonistas.json");

            // Filtra las peliculas que coinciden con el NombreOriginal
            var movieSpecific = allMovies.Where(p => p.NombreOriginal == originalName);

            if (!movieSpecific.Any())
            {
                return NotFound(); // Si no se encuentran películas con ese nombre, devuelve un 404.
            }

            // Verifica si alguna de las listas está vacía
            if (!allMovies.Any() || !allActors.Any())
            {
                return NotFound();
            }

            // Combina las películas y protagonistas por el campo NombreOriginal
            var moviesWithActors = movieSpecific.Select(movie => new
            {
                NombreOriginal = movie.NombreOriginal,
                NombreComercial = movie.NombreComercial,
                Imagen = movie.Imagen,
                Director = movie.Director,
                Clasificacion = movie.Clasificacion,
                Duracion = movie.Duracion,
                Protagonistas = allActors
                    .Where(actor => actor.NombreOriginal == movie.NombreOriginal)
                    .Select(actor => actor.NombreCompleto)
                    .ToList()
            });

            return Ok(moviesWithActors);
        }



        [HttpPost]
        public IActionResult AddMovie([FromBody] Pelicula newMovie)
        {
            // Utiliza el servicio IJsonFileLoader para agregar la nueva película al archivo JSON
            _jsonDataManager.AddToJsonFile<Pelicula>(newMovie, "Peliculas.json");

            // Devuelve una respuesta HTTP 201 (Created) para indicar que la película se ha agregado con éxito
            return CreatedAtAction("AddMovie", newMovie);
        }

        [HttpDelete("{originalName}")]
        public IActionResult DeleteMovie(string originalName)
        {
            var allMovies = _jsonDataManager.LoadJsonFile<Pelicula>("Peliculas.json");

            // Utiliza la función EliminarObjeto para eliminar la película por su nombreOriginal
            _jsonDataManager.RemoveFromJsonFile<Pelicula>(allMovies, p => p.NombreOriginal == originalName, "Peliculas.json");

            return NoContent();
        }

        [HttpPut("{originalName}")]
        public IActionResult UpdateMovie(string originalName, [FromBody] Pelicula updatedMovie)
        {
            try
            {
                // Función de predicado para encontrar la película que coincida con el nombreOriginal
                Func<Pelicula, bool> predicate = p => p.NombreOriginal == originalName;

                // Utiliza la función UpdateJsonFile para actualizar la película
                _jsonDataManager.UpdateJsonFile(updatedMovie, predicate, "Peliculas.json");

                return Ok(updatedMovie); // Devuelve la película actualizada en formato JSON
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al actualizar la película: {ex.Message}");
            }
        }

    }
}
