using SportBooking.Server.Enum;
using SportBooking.Server.models;

namespace SportBooking.Server.Dto
{
    public class BigCourtCreateDto
    {
        public string? Name { get; set; }
        public TypeSportGround Type { get; set; }
    }
    public class BigCourtDetailDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public TypeSportGround Type { get; set; }
        public ICollection<CourtIdDto>? SportGrounds { get; set; }
    }
    public class BigCourtNotCourtsDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public TypeSportGround Type { get; set; }
    }
}
