using CineTECApiBackend.Models;
using CineTECApiBackend.Utilities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CineTECApiBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProtagonistaController : ControllerBase
    {
        private readonly IJsonDataManager _jsonDataManager;
        public ProtagonistaController(IJsonDataManager jsonDataManager)
        {
            _jsonDataManager = jsonDataManager;
        }

        [HttpGet]
        public IActionResult GetActors()
        {
            var allActors = _jsonDataManager.LoadJsonFile<Protagonista>("Protagonistas.json");

            if (!allActors.Any())
            {
                return NotFound();
            }
            return Ok(allActors);
        }

        [HttpPost]
        public IActionResult AddActor([FromBody] Protagonista newActor)
        {
            // Utiliza el servicio IJsonFileLoader para agregar la nueva película al archivo JSON
            _jsonDataManager.AddToJsonFile<Protagonista>(newActor, "Protagonistas.json");

            // Devuelve una respuesta HTTP 201 (Created) para indicar que la película se ha agregado con éxito
            return CreatedAtAction("AddActor", newActor);
        }

        [HttpDelete("{originalName}/{actorName}")]
        public IActionResult DeleteActtor(string originalName,string actorName)
        {
            var allActors = _jsonDataManager.LoadJsonFile<Protagonista>("Protagonistas.json");

            // Utiliza la función EliminarObjeto para eliminar la película por su nombreOriginal
            Func<Protagonista, bool> predicate = a => a.NombreOriginal == originalName && a.NombreCompleto == actorName;
            _jsonDataManager.RemoveFromJsonFile<Protagonista>(allActors, predicate, "Protagonistas.json");
            
            return NoContent();
        }
    }
}
