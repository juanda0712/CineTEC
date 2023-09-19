using CineTECApiBackend.Models;
using CineTECApiBackend.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace CineTECApiBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalaProyeccionController : ControllerBase
    {
        private readonly IJsonDataManager _jsonDataManager;

        public SalaProyeccionController(IJsonDataManager jsonDataManager)
        {
            _jsonDataManager = jsonDataManager;
        }

        [HttpPost]
        public IActionResult AddTheaterProjectionUnion([FromBody] SalaProyeccion newSPUnion)
        {
            _jsonDataManager.AddToJsonFile<SalaProyeccion>(newSPUnion, "SalaProyeccion.json");

            return CreatedAtAction("AddTheaterProjectionUnion", newSPUnion);
        }

        [HttpGet("{iDProjection}")]
        public IActionResult getTheatersByProjection(int iDProjection) 
        {
            var allTheaterProjectionUnions = _jsonDataManager.LoadJsonFile<SalaProyeccion>("SalaProyeccion.json");
            var allTheaters = _jsonDataManager.LoadJsonFile<Sala>("Salas.json");
            var unionsByProjections = allTheaterProjectionUnions.Where(o => o.IDProyeccion == iDProjection);
            var theatersByProjection = allTheaters
                .Where(theater => unionsByProjections.Any(union => union.IDSala == theater.IDSala))
                .ToList();

            return Ok(theatersByProjection);
        }
    }
}
