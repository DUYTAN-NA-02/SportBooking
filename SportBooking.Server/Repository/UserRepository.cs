using Microsoft.EntityFrameworkCore;
using SportBooking.Server.Data;
using SportBooking.Server.Interfaces;
using SportBooking.Server.models;

namespace SportBooking.Server.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<User>> GetUsersAsync()
        {
            return await _context.Users.OrderBy(u => u.Id).ToListAsync();
        }

        public async Task<User> LoginUser(User user)
        {
            return await _context.Users.Where(u => u.Email == user.Email && u.Password == user.Password).FirstOrDefaultAsync();
        }

        public async Task<User> RegisterUser(User user)
        {

            bool userExists = await _context.Users.AnyAsync(u => u.Email == user.Email || u.Name == user.Name);
            if (userExists)
            {
                return null;
            }
            user.Role = Enum.Roles.User;
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<User> GetUserById(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<bool> DeleteUser(User user)
        {
            _context.Remove(user);
            var isDelete = _context.SaveChanges();
            return isDelete > 0 ? true : false;
        }
    }
}
