using SportBooking.Server.models;

namespace SportBooking.Server.Interfaces
{
    public interface ICourtRepository
    {
        Task<IEnumerable<Court>> GetCourts();
        Task<Court> GetCourt(int id);
        Task<Court> AddCourt(int id,Court court);
        Task<Court> UpdateCourt(Court court);
        Task<bool> DeleteCourt(int id);
        Task<bool> Save();
    }
}
