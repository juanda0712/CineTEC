using CineTECApiBackend.Models;
using CineTECApiBackend.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace CineTECApiBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalaController : ControllerBase
    {
        private readonly IJsonDataManager _jsonDataManager;

        public SalaController(IJsonDataManager jsonDataManager)
        {
            _jsonDataManager = jsonDataManager;
        }

        [HttpGet]
        public IActionResult Getheaters() 
        {
            var allTheaters = _jsonDataManager.LoadJsonFile<Sala>("Salas.json");
            if (!allTheaters.Any())
            {
                return NotFound();
            }
            return Ok(allTheaters);
        }
    }
}
