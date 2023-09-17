using CineTECApiBackend.Models;
using CineTECApiBackend.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace CineTECApiBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AsientoController : ControllerBase
    {
        private readonly IJsonDataManager _jsonDataManager;

        public AsientoController(IJsonDataManager jsonDataManager)
        {
            _jsonDataManager = jsonDataManager;
        }

        [HttpGet("{iDTheater}/{iDProjection}")]
        public IActionResult GetSeats(int iDTheater, int iDProjection)
        {
            var allSeats = _jsonDataManager.LoadJsonFile<Asiento>("Asientos.json");

            // Filtrar los asientos que cumplan con las condiciones
            var FilteredSeats= allSeats
                .Where(asiento => asiento.IDSala == iDTheater && asiento.IDProyeccion == iDProjection)
                .ToList();

            return Ok(FilteredSeats);
        }

        [HttpPost]
        public IActionResult AddSeats([FromBody] List<Asiento> newSeats)
        {
            foreach (var newSeat in newSeats)
            {
                _jsonDataManager.AddToJsonFile<Asiento>(newSeat, "Asientos.json");
            }

            // Devuelve una respuesta HTTP 201 (Created) para indicar que los asientos se han agregado con éxito
            return CreatedAtAction("AddSeats", newSeats);
        }
    }
}
