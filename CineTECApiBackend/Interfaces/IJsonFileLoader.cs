namespace CineTECApiBackend.Utilities
{
    public interface IJsonFileLoader
    {
        IEnumerable<T> LoadJsonFile<T>(string fileName);
    }
}
