using SportBooking.Server.models;

namespace SportBooking.Server.Interfaces
{
    public interface IUserRepository
    {
        Task<List<User>> GetUsersAsync();
        Task<User> LoginUser(User user);
        Task<User> RegisterUser(User user);
        Task<User> GetUserById(int id);
        Task<bool> DeleteUser(User user);
    }
}
