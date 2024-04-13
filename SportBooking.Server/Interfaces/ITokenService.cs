using SportBooking.Server.models;

namespace SportBooking.Server.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(User user);
    }
}
