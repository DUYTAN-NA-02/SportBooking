using SportBooking.Server.models;

namespace SportBooking.Server.Interfaces
{
    public interface IBigCourtRepository
    {
        Task<ICollection<BigCourt>> GetBigCourts();
        Task<BigCourt> GetBigCourt(int id);
        Task<BigCourt> CreateBigCourt(BigCourt bigCourt);
        Task<bool> DeleteBigCourt(BigCourt bigCourt);
        Task<BigCourt> UpdateBigCourt(BigCourt bigCourt);
        Task<bool> Save();
    }
}
