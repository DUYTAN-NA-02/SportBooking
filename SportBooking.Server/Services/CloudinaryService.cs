using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using SportBooking.Server.Interfaces;
using System.Net;

namespace SportBooking.Server.Services
{
    public class cloudinaryService : ICloudinaryServies
    {
        private readonly IConfiguration _config;
        Account account;
        Cloudinary cloudinary;
        public cloudinaryService(IConfiguration config)
        {
            _config = config;
            account = new Account(
                    _config["Cloudinary:CloudName"],
                    _config["Cloudinary:ApiKey"],
                    _config["Cloudinary:ApiSecret"]);
            cloudinary = new Cloudinary(account);
            
        }

        public async Task<List<string>> UploadFiles(List<IFormFile> files)
        {
            int size = files.Count;
            List<string> urls = new List<string>();
            for(int i = 0; i < size; i++)
            {
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(files[i].FileName, files[i].OpenReadStream()),
                };
                var uploadResult = await cloudinary.UploadAsync(uploadParams);          
                urls.Add(uploadResult.Url.ToString());
            }
            return urls;
        }
    }
}
