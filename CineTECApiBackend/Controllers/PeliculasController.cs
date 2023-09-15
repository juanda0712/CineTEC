using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CineTECApiBackend.Models;


namespace CineTECApiBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeliculasController : ControllerBase
    {
        private readonly List<Pelicula> peliculas;
        public PeliculasController(List<Pelicula> peliculas)
        {
            this.peliculas = peliculas;
        }

        /// <summary>
        /// Obtiene la lista de películas en formato JSON en lowerCamelCase.
        /// </summary>
        /// <returns>Una lista de películas.</returns>
        [HttpGet]
        public IActionResult ObtenerPeliculas()
        {
            // Tu lógica para obtener las películas aquí

            return Ok(peliculas); // Devuelve la lista de películas en formato JSON en lowerCamelCase
        }
    }
}
