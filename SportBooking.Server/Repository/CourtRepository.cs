using Microsoft.EntityFrameworkCore;
using SportBooking.Server.Data;
using SportBooking.Server.Interfaces;
using SportBooking.Server.models;

namespace SportBooking.Server.Repository
{
    public class CourtRepository : ICourtRepository
    {
        private readonly DataContext _context;
        public CourtRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Court> AddCourt(int id, Court court)
        {
            var bigCourt = await _context.bigCourts.FirstOrDefaultAsync(bc => bc.Id == id);
            if (bigCourt == null)
                return null;
            court.BigCourt = bigCourt;
            await _context.Courts.AddAsync(court);
            await Save();
            return court;
        }

        public async Task<bool> DeleteCourt(int id)
        {
            var court = await _context.Courts.FirstOrDefaultAsync(c => c.Id == id);
            if (court == null)
                return false;
            _context.Courts.Remove(court);
            return await Save();
        }

        public async Task<Court> GetCourt(int id)
        {
            var court = await _context.Courts
                                .Include(c => c.BigCourt)
                                .Include(c => c.TimeSlots)
                                .FirstOrDefaultAsync(c => c.Id == id);
            return court;
        }


        public async Task<IEnumerable<Court>> GetCourts()
        {
            return await _context.Courts
                                .Include(c => c.BigCourt)
                                .Include(c => c.TimeSlots)
                                .OrderBy(c => c.Id).ToListAsync();
        }

        public async Task<Court> UpdateCourt(Court court)
        {
            _context.Courts.Update(court);
            await Save();
            return court;
        }

        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() > 0;
        }

    }
}
