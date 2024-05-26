using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SportBooking.Server.Data;
using SportBooking.Server.Enum;
using SportBooking.Server.Interfaces;
using SportBooking.Server.models;

namespace SportBooking.Server.Repository
{
    public class BookingRepository : IBookingRepository
    {
        private readonly DataContext dataContext;
        private readonly UserManager<User> userManager;
        public BookingRepository(DataContext dataContext, UserManager<User> userManager)
        {
            this.dataContext = dataContext;
            this.userManager = userManager;
        }
        public async Task<Booking?> CreateBooking(Booking booking)
        {
            var userId = booking.UserId;
            if (userId == null)
            {
                return null;
            }
            var user = await userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return null;
            }
            var courtId = booking.CourtId;
            if (courtId == null)
            {
                return null;
            }
            var court = await dataContext.Courts.Include(c => c.BigCourt).Where(c => c.Id == courtId).FirstOrDefaultAsync();
            if (court == null)
            {
                return null;
            }
            var timeSlotId = booking.TimeSlotId;
            if (timeSlotId == null)
            {
                return null;
            }
            var timeSlot = await dataContext.TimeSlots.Where(t => t.Id == timeSlotId && t.CourtId == courtId).FirstOrDefaultAsync();
            if (timeSlot == null)
            {
                return null;
            }
            if(timeSlot.TimeStart < DateTime.Now)
            {
                return null;
            }

            var timeSLotExist = await dataContext.Bookings.Where(b => b.TimeSlotId == timeSlotId).FirstOrDefaultAsync();
            if (timeSLotExist != null)
            {
                return null;
            }

            //var earliestTimeSlot = await dataContext.Bookings
            //        .Where(b => b.UserId == userId)
            //        .Include(b => b.TimeSlot)
            //        .OrderBy(b => b.TimeSlot.TimeEnd)
            //        .Select(b => new { b.TimeSlot.TimeEnd, b.TimeSlot.TimeStart })
            //        .FirstOrDefaultAsync();
            //if (earliestTimeSlot != null && timeSlot.TimeStart <= earliestTimeSlot.TimeEnd && earliestTimeSlot.TimeEnd <= timeSlot.TimeEnd)
            //{
            //    return null;
            //}
            //else if (earliestTimeSlot != null && timeSlot.TimeStart <= earliestTimeSlot.TimeStart && earliestTimeSlot.TimeStart <= timeSlot.TimeEnd)
            //{
            //    return null;
            //}

            booking.User = user;
            booking.Court = court;
            timeSlot.Status = Status.Booked; // can't book
            dataContext.TimeSlots.Update(timeSlot);
            booking.TimeSlot = timeSlot;
            dataContext.Bookings.Add(booking);
            await Save();
            return booking;
        }

        public async Task<bool> DeleteBooking(int id)
        {
            var booking = await dataContext.Bookings.FindAsync(id);
            if (booking == null)
            {
                return false;
            }
            var timeSlot = await dataContext.TimeSlots.FindAsync(booking.TimeSlotId);
            if(timeSlot != null)
            {
                timeSlot.Status = Status.Free;
                dataContext.TimeSlots.Update(timeSlot);
            }
            dataContext.Bookings.Remove(booking);
            return await Save();
        }

        public async Task<Booking> GetBookingById(int id)
        {
            var booking = await dataContext.Bookings
                .Include(b => b.User)
                .Include(b => b.Court)
                    .ThenInclude(c => c.BigCourt)
                .Include(b => b.TimeSlot)
                .FirstOrDefaultAsync(c => c.Id == id);
            if (booking == null)
            {
                return null;
            }
            return booking;
        }

        public async Task<ICollection<Booking>> GetBookings()
        {
            var bookings = await dataContext.Bookings.Include(b => b.TimeSlot).ToListAsync();
            return bookings;
        }

        public async Task<ICollection<Booking>> GetBookingsByCourtId(int courtId)
        {
            var bookingList = await dataContext.Bookings.Where(c => c.CourtId == courtId).ToListAsync();
            return bookingList;
        }

        public async Task<ICollection<Booking>> GetBookingsByUserId(string userId)
        {
            var bookingList = await dataContext.Bookings.Where(c => c.UserId == userId).ToListAsync();
            return bookingList;
        }
        public async Task<Booking> UpdateBooking(Booking booking)
        {
            if(booking.Status == Status.Free)
            {
                   var timeSlot = await dataContext.TimeSlots.FindAsync(booking.TimeSlotId);
                if (timeSlot == null)
                {
                    return null;
                }
                timeSlot.Status = Status.Free;
                dataContext.TimeSlots.Update(timeSlot);
            }
            dataContext.Bookings.Update(booking);
            await Save();
            return booking;
        }

        public async Task<ICollection<Booking>> GetBookingByUserId(string userId)
        {
            var booking = await dataContext.Bookings
                .Include(b => b.User)
                .Include(b => b.Court)
                    .ThenInclude(c => c.BigCourt)
                .Include(b => b.TimeSlot)
                .OrderByDescending(b => b.TimeSlot.TimeStart)
                .Where(c => c.UserId == userId).ToListAsync();

            if (booking == null)
            {
                return null;
            }
            return booking;    
        }

        public async Task<bool> Save()
        {
            return await dataContext.SaveChangesAsync() > 0;
        }

    }
}
