using SportBooking.Server.Enum;
using SportBooking.Server.models;

namespace SportBooking.Server.Dto
{
    public class BookingDto
    {
        public int? CourtId { get; set; }
        public string? UserId { get; set; }
        public int? TimeSlotId { get; set; }
        public Status? Status { get; set; }
    }
    public class BookingUpdateDto
    {
        public Status? Status { get; set; }
    }
    public class BookingDtoRes
    {
        public int? Id { get; set; }
        public int? CourtId { get; set; }
        public string? UserId { get; set; }
        public int? TimeSlotId { get; set; }
        public Status? Status { get; set; }
        public TimeSlotDetail? TimeSlot { get; set; }
    }
    public class BookingDtoResDetail
    {
        public int? Id { get; set; }
        public int? CourtId { get; set; }
        public string? UserId { get; set; }
        public int? TimeSlotId { get; set; }
        public Status? Status { get; set; }
        public TimeSlotDetail? TimeSlot { get; set; }
        public CourtIdDto? Court { get; set; }
        public UserNotTokenDto? User { get; set; }
    }

}
