using SportBooking.Server.models;

namespace SportBooking.Server.Interfaces
{
    public interface IMediaRepository
    {
        Task<List<Media>> AddMedia(int idCourt,List<string> urls);
        Task<bool> Save();
    }
}
