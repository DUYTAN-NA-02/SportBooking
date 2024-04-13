using SportBooking.Server.Enum;

namespace SportBooking.Server.models
{
    public class TimeSlot
    {
        public int Id { get; set; }
        public DateTime? TimeStart { get; set; }
        public DateTime? TimeEnd { get; set; }
        public Status? Status { get; set; } // 0: Can book, 1: Can't book
        public int CourtId { get; set; }
        public Court? Court { get; set; }
    }
}
