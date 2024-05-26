using SportBooking.Server.models;
using System.Diagnostics.CodeAnalysis;

namespace SportBooking.Server.Dto
{
    public class CourtDto
    {
        public string Name { get; set; }
        public decimal Width { get; set; }
        public decimal Height { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string? numberManager { get; set; }
        [AllowNull]
        public List<IFormFile>? Files { get; set; } 
    }
    public class CourtIdDto
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public decimal? Width { get; set; }
        public decimal? Height { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public string? numberManager { get; set; }
        public List<MediaDto>? Medias { get; set; }
    }
    public class CourtBigCourtDto
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public decimal Width { get; set; }
        public decimal Height { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string? numberManager { get; set; }
        public BigCourt? BigCourt { get; set; }
    }
    public class CourtigCourtTimeSlotDto
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public decimal Width { get; set; }
        public decimal Height { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string? numberManager { get; set; }
        public BigCourtNotCourtsDto? BigCourt { get; set; }
        public ICollection<TimeSlotDetail>? TimeSlots { get; set; }
        public ICollection<MediaDto>? Medias { get; set; }
    }
}
