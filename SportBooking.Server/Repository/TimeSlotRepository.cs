using Microsoft.EntityFrameworkCore;
using SportBooking.Server.Data;
using SportBooking.Server.Enum;
using SportBooking.Server.Interfaces;
using SportBooking.Server.models;

namespace SportBooking.Server.Repository
{
    public class TimeSlotRepository : ITimeSlotRepository
    {
        private readonly DataContext _context;
        public TimeSlotRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<TimeSlot> CreateTimeSlot(int id, TimeSlot timeSlot)
        {
            var court = await _context.Courts.FindAsync(id);
            if (court == null)
            {
                return null;
            }
            timeSlot.CourtId = id;
            var timeSlotExist = await _context.TimeSlots
                .Where(x => x.TimeStart <= timeSlot.TimeStart && timeSlot.TimeStart <= x.TimeEnd && x.CourtId == id)
                .FirstOrDefaultAsync();
            if(timeSlotExist != null)
            {
                return null;
            }
            timeSlot.Status = Status.Free; // 0: Can book, 1: Can't book
            _context.TimeSlots.Add(timeSlot);
            await Save();
            return timeSlot;
        }

        public async Task<bool> DeleteTimeSlot(int id)
        {
            var timeslot = await GetTimeSlotById(id);
            if (timeslot == null)
            {
                return false;
            }
            _context.Remove(timeslot);
            return await Save();
        }

        public async Task<TimeSlot> GetTimeSlotById(int id)
        {
            return await _context.TimeSlots.Include(t=>t.Court).Where(c => c.TimeStart >= DateTime.Now.Date && c.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<TimeSlot>> GetTimeSlotsByCourtId(int courtId)
        {
            var court = await _context.Courts.FindAsync(courtId);
            if (court == null)
            {
                return null;
            }
            return await _context.TimeSlots.Include(c=>c.Court).Where(x => x.CourtId == courtId && x.TimeStart >= DateTime.Now.Date).ToListAsync();
        }


        public async Task<TimeSlot> UpdateTimeSlot(TimeSlot timeSlot)
        {
            _context.Update(timeSlot);
            await Save();
            return timeSlot;
        }
        public async Task<IEnumerable<TimeSlot>> GetTimeSlots()
        {
            return await _context.TimeSlots.ToListAsync();
        }
        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() > 0;
        }

    }
}
