using SportBooking.Server.Enum;
using SportBooking.Server.models;
using System.ComponentModel.DataAnnotations;

namespace SportBooking.Server.Dto
{
    public class UserDto
    {
        public string Id { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Token { get; set; }
    }
    public class UserNotTokenDto
    {
        public string Id { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
    }
    public class UserRegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [Phone]
        public string Phone { get; set; }
        [Required]
        [MinLength(12)]
        public string Password { get; set; }
    }
    public class UserLoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
