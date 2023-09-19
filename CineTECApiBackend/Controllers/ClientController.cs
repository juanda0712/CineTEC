using CineTECApiBackend.Models;
using CineTECApiBackend.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace CineTECApiBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IJsonDataManager _jsonDataManager;

        public ClientController(IJsonDataManager jsonDataManager)
        {
            _jsonDataManager = jsonDataManager;
        }

        [HttpGet]
        public IActionResult GetClients() 
        {
            var allClients = _jsonDataManager.LoadJsonFile<Cliente>("Clientes.json");

            if(!allClients.Any())
            {
                return NotFound();
            }
            return Ok(allClients);
        }

        [HttpPost]
        public IActionResult AddClient([FromBody] Cliente newClient)
        {
            // Utiliza el servicio IJsonFileLoader para agregar la nueva película al archivo JSON
            _jsonDataManager.AddToJsonFile<Cliente>(newClient, "Clientes.json");

            // Devuelve una respuesta HTTP 201 (Created) para indicar que la película se ha agregado con éxito
            return CreatedAtAction("AddClient", newClient);
        }

        [HttpDelete("{cedula}")]
        public IActionResult DeleteClient(string cedula)
        {
            var allClients = _jsonDataManager.LoadJsonFile<Cliente>("Clientes.json");

            // Utiliza la función EliminarObjeto para eliminar la película por su nombreOriginal
            _jsonDataManager.RemoveFromJsonFile<Cliente>(allClients, p => p.Cedula == cedula, "Clientes.json");

            return NoContent();
        }

        [HttpPut("{cedula}")]
        public IActionResult UpdateClient(string cedula, [FromBody] Cliente updatedClient)
        {
            try
            {
                // Función de predicado para encontrar la película que coincida con el nombreOriginal
                Func<Cliente, bool> predicate = p => p.Cedula == cedula;

                // Utiliza la función UpdateJsonFile para actualizar la película
                _jsonDataManager.UpdateJsonFile(updatedClient, predicate, "Clientes.json");

                return Ok(updatedClient); // Devuelve la película actualizada en formato JSON
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al actualizar el cliente: {ex.Message}");
            }
        }
    }
}
