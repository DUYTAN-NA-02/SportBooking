using SportBooking.Server.Enum;

namespace SportBooking.Server.models
{
    public class BigCourt
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public TypeSportGround Type { get; set; }
        public ICollection<Court>? SportGrounds { get; set; }
    }
}
