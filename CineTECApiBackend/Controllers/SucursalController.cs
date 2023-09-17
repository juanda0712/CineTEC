using CineTECApiBackend.Models;
using CineTECApiBackend.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace CineTECApiBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SucursalController : ControllerBase
    {
        private readonly IJsonDataManager _jsonDataManager;

        public SucursalController(IJsonDataManager jsonDataManager)
        {
            _jsonDataManager = jsonDataManager;
        }

        [HttpGet]
        public IActionResult GetBranches()
        {
            var allBranches = _jsonDataManager.LoadJsonFile<Sucursal>("Sucursales.json");

            if (!allBranches.Any())
            {
                return NotFound(); 
            }
            return Ok(allBranches); 
        }

        [HttpPost]
        public IActionResult AddBranch([FromBody] Sucursal newBranch)
        {
            // Utiliza el servicio IJsonFileLoader para agregar la nueva película al archivo JSON
            _jsonDataManager.AddToJsonFile<Sucursal>(newBranch, "Sucursales.json");

            // Devuelve una respuesta HTTP 201 (Created) para indicar que la película se ha agregado con éxito
            return CreatedAtAction("AddBranch", newBranch);
        }

        [HttpDelete("{branchName}")]
        public IActionResult DeleteBranch(string branchName)
        {
            var allBranches = _jsonDataManager.LoadJsonFile<Sucursal>("Sucursales.json");

            // Utiliza la función EliminarObjeto para eliminar la película por su nombreOriginal
            _jsonDataManager.RemoveFromJsonFile<Sucursal>(allBranches, p => p.Nombre == branchName, "Sucursales.json");

            return NoContent();
        }
        [HttpPut("{branchName}")]
        public IActionResult UpdateBranch(string branchName, [FromBody] Sucursal updatedBranch)
        {
            try
            {
                // Función de predicado para encontrar la película que coincida con el nombreOriginal
                Func<Sucursal, bool> predicate = p => p.Nombre == branchName;

                // Utiliza la función UpdateJsonFile para actualizar la película
                _jsonDataManager.UpdateJsonFile(updatedBranch, predicate, "Sucursales.json");

                return Ok(updatedBranch); // Devuelve la película actualizada en formato JSON
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al actualizar la Sucursal: {ex.Message}");
            }
        }
    }
}
