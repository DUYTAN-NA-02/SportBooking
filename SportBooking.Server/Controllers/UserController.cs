using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SportBooking.Server.Dto;
using SportBooking.Server.Interfaces;
using SportBooking.Server.models;
using SportBooking.Server.ValidData;

namespace SportBooking.Server.Controllers
{
    [Route("auth/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UserController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ICollection<User>))]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userRepository.GetUsersAsync();
            if (users == null)
                return BadRequest("Not have users");
            var newUser = _mapper.Map<List<UserDto>>(users);
            return Ok(newUser);
        }

        [HttpPost("Login")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(404)]
        public async Task<IActionResult> LoginUser(UserLoginDto user)
        {
            if (user == null)
            {
                return BadRequest("Have not user");
            }
            string email = user.Email;
            if (!VaildLoginRegister.IsEmail(email))
            {
                return BadRequest("Email is not valid");
            }
            string password = user.Password;
            if (!VaildLoginRegister.IsPassword(password))
            {
                return BadRequest("Password is not valid");
            }
            var newuser = await _userRepository.LoginUser(_mapper.Map<User>(user));
            if (newuser == null)
            {
                return NotFound();
            }
            var userResponse = _mapper.Map<UserDto>(newuser);
            return Ok(userResponse);
        }

        [HttpPost("Register")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400)]
        public async Task<IActionResult> RegisterUser([FromBody] UserRegisterDto user)
        {
            string email = user.Email;
            if (!VaildLoginRegister.IsEmail(email))
            {
                return BadRequest("Email is not valid");
            }
            string password = user.Password;
            if (!VaildLoginRegister.IsPassword(password))
            {
                return BadRequest("Password is not valid");
            }
            string phone = user.Phone;
            if (!VaildLoginRegister.IsPhoneNumber(phone))
            {
                return BadRequest("Phone is not valid");
            }
            var newUser = await _userRepository.RegisterUser(_mapper.Map<User>(user));
            if (newUser == null)
            {
                return BadRequest("User already exists");
            }
            var userResponse = _mapper.Map<UserDto>(newUser);
            return Ok(userResponse);
        }
        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _userRepository.GetUserById(id);

            if (user == null)
                return NotFound();

            var newUser = _mapper.Map<UserDto>(user);
            return Ok(newUser);
        }
        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _userRepository.GetUserById(id);

            if (user == null)
                return NotFound();

            var isDeleted = await _userRepository.DeleteUser(user);

            if (!isDeleted)
                return BadRequest("Delete user Failed");
            return Ok("User Deleted");
        }
    }
}
