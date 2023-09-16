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
        public IActionResult ObtenerPeliculas()
        {
            // Tu lógica para obtener las películas aquí
            var todasLasPeliculas = _jsonDataManager.LoadJsonFile<Pelicula>("Peliculas.json");

            if (!todasLasPeliculas.Any())
            {
                return NotFound(); // Si no se encuentran proyecciones para la película, devuelve un 404.
            }
            return Ok(todasLasPeliculas); // Devuelve la lista de películas en formato JSON en lowerCamelCase
        }

        [HttpPost]
        public IActionResult AgregarPelicula([FromBody] Pelicula nuevaPelicula)
        {
            // Utiliza el servicio IJsonFileLoader para agregar la nueva película al archivo JSON
            _jsonDataManager.AddToJsonFile<Pelicula>(nuevaPelicula, "Peliculas.json");

            // Devuelve una respuesta HTTP 201 (Created) para indicar que la película se ha agregado con éxito
            return CreatedAtAction("ObtenerPeliculas", nuevaPelicula);
        }

        [HttpDelete("{nombreOriginal}")]
        public IActionResult EliminarPelicula(string nombreOriginal)
        {
            var todasLasPeliculas = _jsonDataManager.LoadJsonFile<Pelicula>("Peliculas.json");

            // Utiliza la función EliminarObjeto para eliminar la película por su nombreOriginal
            _jsonDataManager.RemoveFromJsonFile<Pelicula>(todasLasPeliculas, p => p.NombreOriginal == nombreOriginal, "Peliculas.json");

            return NoContent();
        }

        [HttpPut("{nombreOriginal}")]
        public IActionResult ActualizarPelicula(string nombreOriginal, [FromBody] Pelicula peliculaActualizada)
        {
            try
            {
                // Función de predicado para encontrar la película que coincida con el nombreOriginal
                Func<Pelicula, bool> predicate = p => p.NombreOriginal == nombreOriginal;

                // Utiliza la función UpdateJsonFile para actualizar la película
                _jsonDataManager.UpdateJsonFile(peliculaActualizada, predicate, "Peliculas.json");

                return Ok(peliculaActualizada); // Devuelve la película actualizada en formato JSON
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al actualizar la película: {ex.Message}");
            }
        }

    }
}
