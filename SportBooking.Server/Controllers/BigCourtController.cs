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
    public class BigCourtController : Controller
    {
        private readonly IBigCourtRepository _bigCourtRepository;
        private readonly IMapper _mapper;
        public BigCourtController(IBigCourtRepository bigCourtRepository, IMapper mapper)
        {
            _bigCourtRepository = bigCourtRepository;
            _mapper = mapper;
        }

        [HttpGet("GetListBigCourts")]
        [ProducesResponseType(200, Type = typeof(ICollection<BigCourt>))]
        public async Task<IActionResult> GetBigCourts()
        {
            var bigCourts = await _bigCourtRepository.GetBigCourts();
            if (bigCourts == null)
                return BadRequest("Have not bigcourt");
            var bigCourtsDto = _mapper.Map<ICollection<BigCourtDetailDto>>(bigCourts);
            return Ok(bigCourtsDto);
        }

        [HttpGet("GetBigCourt/{id}")]
        [ProducesResponseType(200, Type = typeof(BigCourt))]
        public async Task<IActionResult> GetBigCourt(int id)
        {
            var bigCourt = await _bigCourtRepository.GetBigCourt(id);
            if (bigCourt == null)
                return NotFound("Have not bigcourt");
            var bigCourtDto = _mapper.Map<BigCourtDetailDto>(bigCourt);
            return Ok(bigCourtDto);
        }

        [HttpPost("CreateBigCourt")]
        [ProducesResponseType(200, Type = typeof(bool))]
        public async Task<IActionResult> CreateBigCourt(BigCourtCreateDto bigCourt)
        {
            if (!ValidEnum.IsDefined(typeof(TypeSportGround), bigCourt.Type))
            {
                return BadRequest("Type is not valid");
            }
            var newBigCourt = await _bigCourtRepository.CreateBigCourt(_mapper.Map<BigCourt>(bigCourt));
            if (newBigCourt == null)
                return BadRequest("BigCourt exists");
            return Ok(newBigCourt);
        }

        [HttpDelete("DeleteBigCourt/{id}")]
        [ProducesResponseType(200, Type = typeof(bool))]
        public async Task<IActionResult> DeleteBigCourt(int id)
        {
            var BigCourt = await _bigCourtRepository.GetBigCourt(id);
            if (BigCourt == null)
                return NotFound();
            var result = await _bigCourtRepository.DeleteBigCourt(BigCourt);
            if (!result)
                return BadRequest("Delete failed");
            return Ok(result);
        }

        [HttpPut("UpdateBigCourt/{id}")]
        [ProducesResponseType(200, Type = typeof(bool))]
        public async Task<IActionResult> UpdateBigCourt(int id, BigCourtCreateDto bigCourt)
        {
            if (!ValidEnum.IsDefined(typeof(TypeSportGround), bigCourt.Type))
            {
                return BadRequest("Type is not valid");
            }
            var BigCourt = await _bigCourtRepository.GetBigCourt(id);
            if (BigCourt == null)
                return NotFound("Not found");
            _mapper.Map(bigCourt, BigCourt);
            var result = await _bigCourtRepository.UpdateBigCourt(BigCourt);
            if (result == null)
                return BadRequest("Update failed");
            var resultDto = _mapper.Map<BigCourtDetailDto>(result);
            return Ok(resultDto);
        }
    }
}
