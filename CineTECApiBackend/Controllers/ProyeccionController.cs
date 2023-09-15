using CineTECApiBackend.DataManagement;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CineTECApiBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProyeccionController : ControllerBase
    {

        [HttpGet("proyeccionesPorPelicula")]
        public IActionResult ObtenerProyeccionesPorPelicula(string NombreOriginal)
        {
            // Obtén todas las proyecciones desde tu repositorio o archivo JSON
            var todasLasProyecciones = Ejemplo.ObtenerProyecciones();

            // Filtra las proyecciones que coinciden con el NombreOriginal
            var proyeccionesPorPelicula = todasLasProyecciones.Where(p => p.Pelicula == NombreOriginal);

            if (!proyeccionesPorPelicula.Any())
            {
                return NotFound(); // Si no se encuentran proyecciones para la película, devuelve un 404.
            }

            return Ok(proyeccionesPorPelicula);
        }

    }
}
