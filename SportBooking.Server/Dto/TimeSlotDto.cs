using SportBooking.Server.Enum;

namespace SportBooking.Server.Dto
{
    public class TimeSlotDto
    {
        public DateTime? TimeStart { get; set; }
        public DateTime? TimeEnd { get; set; }
        public int? Status { get; set; } // 1: Can book, 0: Can't book
    }
    public class TimeSlotDetail
    {
        public int Id { get; set; }
        public DateTime? TimeStart { get; set; }
        public DateTime? TimeEnd { get; set; }
        public Status? Status { get; set; } // 0: Can book, 1: Can't book
        public int CourtId { get; set; }
    }
}
