namespace SportBooking.Server.models
{
    public class Court
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public decimal? Width { get; set; }
        public decimal? Height { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public int? BigCourtId { get; set; }
        public BigCourt? BigCourt { get; set; }
        public ICollection<Booking>? Bookings { get; set; }
        public ICollection<TimeSlot>? TimeSlots { get; set; }
        public ICollection<Media>? Medias { get; set; }

    }
}
