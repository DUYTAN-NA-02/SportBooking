namespace SportBooking.Server.models
{
    public class Invoice
    {
        public int Id { get; set; }
        public int? BookingId { get; set; }
        public string? Date { get; set; }
        public Booking? Booking { get; set; }
        ICollection<Booking>? Bookings { get; set; }
    }
}
