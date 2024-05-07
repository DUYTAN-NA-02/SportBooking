namespace SportBooking.Server.Interfaces
{
    public interface ICloudinaryServies
    {
        Task<List<string>> UploadFiles(List<IFormFile> files);
    }
}
