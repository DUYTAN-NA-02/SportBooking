using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SportBooking.Server.Dto;
using SportBooking.Server.Enum;
using SportBooking.Server.Interfaces;
using SportBooking.Server.models;
using SportBooking.Server.ValidData;

namespace SportBooking.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookingController : Controller
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IMapper _mapper;
        public BookingController(IBookingRepository bookingRepository, IMapper mapper)
        {
            _bookingRepository = bookingRepository;
            _mapper = mapper;
        }
        [HttpGet("GetBookings")]
        //[Authorize(Roles = "Admin")]
        [ProducesResponseType(200, Type = typeof(ICollection<Booking>))]
        public async Task<IActionResult> GetBookings()
        {
            var bookingList = await _bookingRepository.GetBookings();
            var newBookingList = _mapper.Map<ICollection<BookingDtoRes>>(bookingList);
            return Ok(newBookingList);
        }

        [HttpGet("Booking/{id}")]
        [ProducesResponseType(200, Type = typeof(Booking))]
        public async Task<IActionResult> GetBookingById(int id)
        {
            var booking = await _bookingRepository.GetBookingById(id);
            if (booking == null)
            {
                return NotFound("Not Found");
            }
            var newBooking = _mapper.Map<BookingDtoResDetail>(booking);
            return Ok(newBooking);
        }
        [HttpPost("Booking")]
        [ProducesResponseType(200, Type = typeof(Booking))]
        public async Task<IActionResult> CreateBooking([FromBody] BookingDto booking)
        {
            if(!ValidEnum.IsDefined(typeof(Status), booking.Status))
            {
               return BadRequest("Status is not valid");
            }
            var newBooking = await _bookingRepository.CreateBooking(_mapper.Map<Booking>(booking));
            if (newBooking == null)
            {
                return BadRequest("Add booking Failed");
            }
            var _newBooking = _mapper.Map<BookingDtoResDetail>(newBooking);
            return Ok(_newBooking);
        }
        [HttpPut("Booking/{id}")]
        [ProducesResponseType(200,Type = typeof(Booking))]
        public async Task<IActionResult> UpdateBooking(int id, [FromBody] BookingUpdateDto booking)
        {
            if (!ValidEnum.IsDefined(typeof(Status), booking.Status))
            {
                return BadRequest("Status is not valid");
            }
            var oldBooking = await _bookingRepository.GetBookingById(id);
            if (oldBooking == null)
            {
                return NotFound("Have not booking");
            }
            var newBooking = _mapper.Map(booking, oldBooking);
            var updatedBooking = await _bookingRepository.UpdateBooking(newBooking);
            if (updatedBooking == null)
            {
                return BadRequest("Update booking failed");
            }
            var _newBooking = _mapper.Map<BookingDtoRes>(updatedBooking);
            return Ok(_newBooking);
        }
        [HttpDelete("Booking/{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var isDeleted = await _bookingRepository.DeleteBooking(id);
            if (!isDeleted)
            {
                return NotFound();
            }
            return Ok("Delete booking success");
        }
        [HttpGet("GetBookingByUser/{id}")]
        [ProducesResponseType(200, Type = typeof(Booking))]
        public async Task<IActionResult> GetBookingByUserId(string id)
        {
            var booking = await _bookingRepository.GetBookingByUserId(id);
            if (booking == null)
            {
                return NotFound("Not Found");
            }
            var newBooking = _mapper.Map<ICollection<BookingDtoResDetail>>(booking);
            return Ok(newBooking);
        }
    }
}
