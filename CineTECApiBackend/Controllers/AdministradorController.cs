using CineTECApiBackend.Models;
using CineTECApiBackend.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace CineTECApiBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdministradorController : ControllerBase
    {
        private readonly IJsonDataManager _jsonDataManager;
        public AdministradorController(IJsonDataManager jsonDataManager)
        {
            _jsonDataManager = jsonDataManager;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Administrador credentials)
        {
            try
            {
                // Cargar la lista de administradores desde el archivo JSON
                var allAdmins = _jsonDataManager.LoadJsonFile<Administrador>("Administradores.json");

                // Verificar si las credenciales son válidas
                var administrador = allAdmins.FirstOrDefault(a => a.Usuario == credentials.Usuario && a.Password == credentials.Password);

                if (administrador != null)
                {
                    // Las credenciales son válidas, aca es donde se retorna un token de autenticación.
                    // Aquí simplemente retornamos un mensaje de éxito.
                    return Ok(new { status = "ok" });
                }
                else
                {
                    // Credenciales no válidas, retorna un mensaje de error.
                    return BadRequest("Incorrect Credentials");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error en el servidor: {ex.Message}");
            }
        }


    }
}
