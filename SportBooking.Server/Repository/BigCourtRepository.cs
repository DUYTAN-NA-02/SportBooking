using Microsoft.EntityFrameworkCore;
using SportBooking.Server.Data;
using SportBooking.Server.Interfaces;
using SportBooking.Server.models;

namespace SportBooking.Server.Repository
{
    public class BigCourtRepository : IBigCourtRepository
    {
        private readonly DataContext _context;
        public BigCourtRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<BigCourt> CreateBigCourt(BigCourt bigCourt)
        {
            var bigCourtExists = await _context.bigCourts.AnyAsync(x => x.Name == bigCourt.Name);
            if (bigCourtExists)
            {
                return null;
            }
            _context.bigCourts.Add(bigCourt);
            await Save();
            return bigCourt;
        }

        public async Task<bool> DeleteBigCourt(BigCourt bigCourt)
        {
            _context.bigCourts.Remove(bigCourt);
            return await Save();
        }

        public async Task<BigCourt> GetBigCourt(int id)
        {
            var bigCourt = await _context.bigCourts.Include(bc=>bc.SportGrounds).Where(x => x.Id == id).FirstOrDefaultAsync();
            return bigCourt;
        }

        public async Task<ICollection<BigCourt>> GetBigCourts()
        {
            return await _context.bigCourts.Include(bc => bc.SportGrounds).ToListAsync();
        }

        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() > 0 ? true : false;
        }

        public async Task<BigCourt> UpdateBigCourt(BigCourt bigCourt)
        {
            _context.bigCourts.Update(bigCourt);
            await Save();
            return bigCourt;
        }
    }
}
