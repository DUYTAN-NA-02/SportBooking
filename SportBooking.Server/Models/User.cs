using Microsoft.AspNetCore.Identity;
using SportBooking.Server.Enum;

namespace SportBooking.Server.models
{
    public class User : IdentityUser
    {
        public ICollection<Booking>? Bookings { get; set; }
    }
}
