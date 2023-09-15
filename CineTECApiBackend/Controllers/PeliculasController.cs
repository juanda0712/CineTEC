using Microsoft.AspNetCore.Mvc;
using CineTECApiBackend.Models;
using CineTECApiBackend.Utilities;

namespace CineTECApiBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeliculasController : ControllerBase
    {
        private readonly IJsonFileLoader _jsonFileLoader;

        public PeliculasController(IJsonFileLoader jsonFileLoader)
        {
            _jsonFileLoader = jsonFileLoader;
        }

        [HttpGet]
        public IActionResult ObtenerPeliculas()
        {
            // Tu lógica para obtener las películas aquí
            var todasLasPeliculas = _jsonFileLoader.LoadJsonFile<Pelicula>("Peliculas.json");

            if (!todasLasPeliculas.Any())
            {
                return NotFound(); // Si no se encuentran proyecciones para la película, devuelve un 404.
            }
            return Ok(todasLasPeliculas); // Devuelve la lista de películas en formato JSON en lowerCamelCase
        }
    }
}
