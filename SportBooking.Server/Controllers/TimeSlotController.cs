using AutoMapper;
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
    public class TimeSlotController : Controller
    {
        private readonly ITimeSlotRepository _timeSlotRepository;
        private readonly IMapper _mapper;
        public TimeSlotController(ITimeSlotRepository timeSlotRepository, IMapper mapper)
        {
            _timeSlotRepository = timeSlotRepository;
            _mapper = mapper;
        }
        [HttpGet("GetTimeSlotList")]
        public async Task<IActionResult> GetTimeSlotList()
        {
            var timeSlots = await _timeSlotRepository.GetTimeSlots();
            if (timeSlots == null)
            {
                return NotFound("Have not timeslots");
            }
            var timeSlotDetails = _mapper.Map<ICollection<TimeSlotDetail>>(timeSlots);
            return Ok(timeSlotDetails);
        }

        [HttpGet("GetTimeSlotById/{id}")]
        public async Task<IActionResult> GetTimeSlotById(int id)
        {
            var timeSlot = await _timeSlotRepository.GetTimeSlotById(id);
            if (timeSlot == null)
            {
                return NotFound("Not Found");
            }
            var timeSlotDetail = _mapper.Map<TimeSlotDetail>(timeSlot);
            return Ok(timeSlotDetail);
        }
        [HttpGet("GetTimeSlotsByCourt/{courtId}")]
        [ProducesResponseType(200, Type = typeof(ICollection<TimeSlot>))]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetTimeSlotsByCourtId(int courtId)
        {
            var timeSlots = await _timeSlotRepository.GetTimeSlotsByCourtId(courtId);
            if (timeSlots == null)
            {
                return NotFound("Not found");
            }
            var timeSlotDetails = _mapper.Map<ICollection<TimeSlotDetail>>(timeSlots);
            return Ok(timeSlotDetails);
        }
        [HttpPost("CreateTimeSlot/{id}")]
        [ProducesResponseType(200, Type = typeof(TimeSlot))]
        [ProducesResponseType(404)]
        public async Task<IActionResult> CreateTimeSlot(int id, [FromBody] TimeSlotDto timeSlotDto)
        {
            if (!ValidDateTime.IsDateTimeSmallThenNow(timeSlotDto.TimeStart.ToString()))
            {
                return BadRequest("Time start is small than now");
            }
            if (!ValidDateTime.isDateStartSmallDateEnd(timeSlotDto.TimeStart.ToString(), timeSlotDto.TimeEnd.ToString()))
            {
                return BadRequest("Time start is greater than time end");
            }
            if (!ValidEnum.IsDefined(typeof(Status), timeSlotDto.Status))
            {
                return BadRequest("Type is not valid");
            }
            var newTimeSlot = _mapper.Map<TimeSlot>(timeSlotDto);
            var timeSlot = await _timeSlotRepository.CreateTimeSlot(id, newTimeSlot);
            if (timeSlot == null)
            {
                return BadRequest("Create failed");
            }
            var timeSlotDetail = _mapper.Map<TimeSlotDetail>(timeSlot);
            return Ok(timeSlotDetail);
        }
        [HttpPut("UpdateTimeSlot/{id}")]
        [ProducesResponseType(200, Type = typeof(TimeSlot))]
        [ProducesResponseType(404)]
        public async Task<IActionResult> UpdateTimeSlot(int id, [FromBody] TimeSlotDto timeSlotDto)
        {
            if (!ValidDateTime.IsDateTimeSmallThenNow(timeSlotDto.TimeStart.ToString()))
            {
                return BadRequest("Time start is small than now");
            }
            if (!ValidDateTime.isDateStartSmallDateEnd(timeSlotDto.TimeStart.ToString(), timeSlotDto.TimeEnd.ToString()))
            {
                return BadRequest("Time start is greater than time end");
            }
            if (!ValidEnum.IsDefined(typeof(Status), timeSlotDto.Status))
            {
                return BadRequest("Type is not valid");
            }
            var oldTimeSlot = await _timeSlotRepository.GetTimeSlotById(id);
            if (oldTimeSlot == null)
            {
                return NotFound("Have not time slot");
            }
            var newTimeSlot = _mapper.Map(timeSlotDto, oldTimeSlot);
            var timeSlot = await _timeSlotRepository.UpdateTimeSlot(newTimeSlot);
            if (timeSlot == null)
            {
                return BadRequest("Update failed");
            }
            var timeSlotDetail = _mapper.Map<TimeSlotDetail>(timeSlot);
            return Ok(timeSlotDetail);
        }
        [HttpDelete("DeleteTimeSlot/{id}")]
        public async Task<IActionResult> DeleteTimeSlot(int id)
        {
            var result = await _timeSlotRepository.DeleteTimeSlot(id);
            if (!result)
            {
                return NotFound("Not found");
            }
            return Ok("Delete success");
        }
    }
}
