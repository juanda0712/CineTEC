using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CineTECApiBackend.Models;
using CineTECApiBackend.DataManagement;

namespace CineTECApiBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeliculasController : ControllerBase
    {
        //private readonly List<Pelicula> peliculas;
        //public PeliculasController(List<Pelicula> peliculas)
        //{
        //    this.peliculas = peliculas;
        //}

        /// <summary>
        /// Obtiene la lista de películas en formato JSON en lowerCamelCase.
        /// </summary>
        /// <returns>Una lista de películas.</returns>
        [HttpGet]
        public IActionResult ObtenerPeliculas()
        {
            // Tu lógica para obtener las películas aquí
            var todasLasPeliculas = Ejemplo.ObtenerPeliculas();

            if (!todasLasPeliculas.Any())
            {
                return NotFound(); // Si no se encuentran proyecciones para la película, devuelve un 404.
            }
            return Ok(todasLasPeliculas); // Devuelve la lista de películas en formato JSON en lowerCamelCase
        }
    }
}
