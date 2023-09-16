namespace CineTECApiBackend.Utilities
{
    public interface IJsonDataManager
    {
        IEnumerable<T> LoadJsonFile<T>(string fileName);
        void SaveJsonFile<T>(IEnumerable<T> data, string fileName);
        void AddToJsonFile<T>(T newObject, string fileName);
        void RemoveFromJsonFile<T>(IEnumerable<T> data, Func<T, bool> predicate, string fileName);
        void UpdateJsonFile<T>(T updatedObject, Func<T, bool> predicate, string fileName);
    }
}
