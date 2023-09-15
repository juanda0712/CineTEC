using System.Text.Json;

namespace CineTECApiBackend.Utilities
{
    public class JsonFileLoader : IJsonFileLoader
    {
        public IEnumerable<T> LoadJsonFile<T>(string fileName)
        {
            try
            {
                // Obtén la ruta completa al archivo JSON en el directorio "JSONDB"
                string directoryPath = "JSONDB"; // Puedes ajustar la ruta según sea necesario
                string filePath = Path.Combine(directoryPath, fileName);

                if (!File.Exists(filePath))
                {
                    Console.WriteLine($"El archivo JSON '{fileName}' no existe en el directorio '{directoryPath}'.");
                    return new List<T>();
                }

                string json = File.ReadAllText(filePath);
                List<T> data = JsonSerializer.Deserialize<List<T>>(json);
                return data;
            }
            catch (Exception ex)
            {
                // Manejar errores de lectura de archivo, por ejemplo, el archivo no existe o el JSON no se puede deserializar.
                Console.WriteLine($"Error al leer el archivo JSON: {ex.Message}");
                return new List<T>(); // Otra acción adecuada en caso de error.
            }
        }
    }
}
