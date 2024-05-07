using SportBooking.Server.models;

namespace SportBooking.Server.models
{
    public class Media
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public int CourtId { get; set; }
        public Court Court { get; set; }
    }
}
