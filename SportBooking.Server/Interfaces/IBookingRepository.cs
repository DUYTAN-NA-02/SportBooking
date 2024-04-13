using SportBooking.Server.Dto;
using SportBooking.Server.models;

namespace SportBooking.Server.Interfaces
{
    public interface IBookingRepository
    {
        Task<ICollection<Booking>> GetBookings();
        Task<ICollection<Booking>> GetBookingsByUserId(int userId);
        Task<ICollection<Booking>> GetBookingsByCourtId(int courtId);
        Task<Booking> GetBookingById(int id);
        Task<Booking> CreateBooking(Booking booking);
        Task<Booking> UpdateBooking(Booking booking);
        Task<bool> DeleteBooking(int id);
        Task<ICollection<Booking>> GetBookingByUserId(int userId);
        Task<bool> Save();
    }
}
