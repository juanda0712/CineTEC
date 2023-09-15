using CineTECApiBackend.Models;
using System.Text.Json;

namespace CineTECApiBackend.DataManagement
{
    public class Ejemplo
    {
        public static IEnumerable<Proyeccion> ObtenerProyecciones()
        {
            try
            {
                string json = File.ReadAllText("Proyecciones.json");
                List<Proyeccion> proyecciones = JsonSerializer.Deserialize<List<Proyeccion>>(json);
                return proyecciones;
            }
            catch (Exception ex)
            {
                // Manejar errores de lectura de archivo, por ejemplo, el archivo no existe o el JSON no se puede deserializar.
                Console.WriteLine($"Error al leer el archivo JSON: {ex.Message}");
                return new List<Proyeccion>(); // Otra acción adecuada en caso de error.
            }
        }

        public static IEnumerable<Pelicula> ObtenerPeliculas()
        {

            try
            {
                string json = File.ReadAllText("Peliculas.json");
                List<Pelicula> peliculas = JsonSerializer.Deserialize<List<Pelicula>>(json);
                return peliculas;
            }
            catch (Exception ex)
            {
                // Manejar errores de lectura de archivo, por ejemplo, el archivo no existe o el JSON no se puede deserializar.
                Console.WriteLine($"Error al leer el archivo JSON: {ex.Message}");
                return new List<Pelicula>(); // Otra acción adecuada en caso de error.
            }
        }
    }
}
