using SportBooking.Server.Enum;

namespace SportBooking.Server.models
{
    public class Booking
    {
        public int? Id { get; set; }
        public int? CourtId { get; set; }
        public string? UserId { get; set; }
        public int? TimeSlotId { get; set; }
        public Status? Status { get; set; }
        public TimeSlot? TimeSlot { get; set; }
        public Court? Court { get; set; }
        public User? User { get; set; }
    }
}
