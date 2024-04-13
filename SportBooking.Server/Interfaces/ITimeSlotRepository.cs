using SportBooking.Server.models;

namespace SportBooking.Server.Interfaces
{
    public interface ITimeSlotRepository
    {
        Task<IEnumerable<TimeSlot>> GetTimeSlots();
        Task<IEnumerable<TimeSlot>> GetTimeSlotsByCourtId(int courtId);
        Task<TimeSlot> GetTimeSlotById(int id);
        Task<TimeSlot> CreateTimeSlot(int id,TimeSlot timeSlot);
        Task<TimeSlot> UpdateTimeSlot(TimeSlot timeSlot);
        Task<bool> DeleteTimeSlot(int id);
        Task<bool> Save();
    }
}
