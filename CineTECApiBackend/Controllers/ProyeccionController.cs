﻿using CineTECApiBackend.Models;
using CineTECApiBackend.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace CineTECApiBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProyeccionController : ControllerBase
    {
        private readonly IJsonDataManager _jsonDataManager;

        public ProyeccionController(IJsonDataManager jsonDataManager)
        {
            _jsonDataManager = jsonDataManager;
        }

        [HttpGet("proyeccionesPorPelicula")]
        public IActionResult ObtenerProyeccionesPorPelicula(string NombreOriginal)
        {
            // Obtén todas las proyecciones desde tu repositorio o archivo JSON
            var todasLasProyecciones = _jsonDataManager.LoadJsonFile<Proyeccion>("Proyecciones.json");

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