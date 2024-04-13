using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportBooking.Server.Dto;
using SportBooking.Server.Interfaces;
using SportBooking.Server.models;
using SportBooking.Server.ValidData;

namespace SportBooking.Server.Controllers
{
    [Route("auth/account")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<User> _signinManager;
        public UserController(UserManager<User> userManager, ITokenService tokenService, SignInManager<User> signInManager, IMapper mapper)
        {
            _mapper = mapper;
            _userManager = userManager;
            _tokenService = tokenService;
            _signinManager = signInManager;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email.ToLower());
            if (user == null) return Unauthorized("Invalid username!");

            var result = await _signinManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized("Username not found and/or password incorrect");

            var userDto = _mapper.Map<UserDto>(user);
            userDto.Token = await _tokenService.CreateToken(user);
            return Ok(userDto);
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var appUser = new User
                {
                    UserName = registerDto.Email,
                    Email = registerDto.Email,
                    PhoneNumber = registerDto.Phone
                };

                var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (createdUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser, "User");
                    if (roleResult.Succeeded)
                    {
                        return Ok(
                            new UserDto
                            {
                                Id = appUser.Id,
                                UserName = appUser.UserName,
                                Email = appUser.Email,
                                PhoneNumber = appUser.PhoneNumber,
                                Token = await _tokenService.CreateToken(appUser)
                            }
                        );
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createdUser.Errors);
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }
    }
}
