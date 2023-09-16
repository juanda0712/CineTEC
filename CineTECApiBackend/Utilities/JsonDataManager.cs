using CineTECApiBackend.Models;
using System.Text.Json;

namespace CineTECApiBackend.Utilities
{
    public class JsonDataManager : IJsonDataManager
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
        public void SaveJsonFile<T>(IEnumerable<T> data, string fileName)
        {
            string jsonDirectory = "JSONDB";
            string filePath = Path.Combine(jsonDirectory, fileName);
            string jsonString = JsonSerializer.Serialize(data, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(filePath, jsonString);
        }
        public void AddToJsonFile<T>(T newObject, string fileName)
        {
            try
            {
                List<T> objects = LoadJsonFile<T>(fileName).ToList();
                objects.Add(newObject);
                SaveJsonFile(objects, fileName);

            }
            catch (Exception ex)
            {
                // Manejar errores de escritura de archivo si es necesario
                Console.WriteLine($"Error al agregar el objeto al archivo JSON: {ex.Message}");
            }
        }

        public void RemoveFromJsonFile<T>(IEnumerable<T> data, Func<T, bool> predicate, string fileName)
        {
            try
            {
                var dataList = data.ToList();
                var objetoAEliminar = dataList.FirstOrDefault(predicate);
                if (objetoAEliminar != null)
                {
                    dataList.Remove(objetoAEliminar);
                    SaveJsonFile(dataList, fileName);
                }
            }
            catch (Exception ex)
            {
                // Manejar errores si es necesario
                Console.WriteLine($"Error al eliminar el objeto del archivo JSON: {ex.Message}");
            }
        }
        public void UpdateJsonFile<T>(T updatedObject, Func<T, bool> predicate, string fileName)
        {
            try
            {
                List<T> data = LoadJsonFile<T>(fileName).ToList();

                // Encuentra el objeto que cumple con el predicado
                var existingObject = data.FirstOrDefault(predicate);

                if (existingObject == null)
                {
                    throw new Exception("No se encontró el objeto a actualizar.");
                }

                // Actualiza el objeto con los datos proporcionados
                var properties = typeof(T).GetProperties();
                foreach (var prop in properties)
                {
                    var updatedValue = prop.GetValue(updatedObject);
                    prop.SetValue(existingObject, updatedValue);
                }

                // Guarda la lista actualizada en el archivo JSON
                SaveJsonFile(data, fileName);
            }
            catch (Exception ex)
            {
                // Manejar errores si es necesario
                Console.WriteLine($"Error al actualizar el objeto en el archivo JSON: {ex.Message}");
            }
        }
    }
}
