using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SportBooking.Server.Dto;
using SportBooking.Server.Interfaces;
using SportBooking.Server.models;
using SportBooking.Server.Repository;

namespace SportBooking.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CourtController : Controller
    {
        private readonly ICourtRepository _courtRepository;
        private readonly ICloudinaryServies _cloudinaryServies;
        private readonly IMediaRepository _mediaRepository;
        private readonly IMapper _mapper;
        public CourtController(ICourtRepository courtRepository,
            IMapper mapper,
            ICloudinaryServies cloudinaryServies,
            IMediaRepository mediaRepository)
        {
            _courtRepository = courtRepository;
            _mapper = mapper;
            _cloudinaryServies = cloudinaryServies;
            _mediaRepository = mediaRepository;
        }

        [HttpGet("GetListCourts")]
        [ProducesResponseType(200, Type = typeof(ICollection<Court>))]
        public async Task<IActionResult> GetCourts()
        {
            var courts = await _courtRepository.GetCourts();
            if (courts == null)
                return BadRequest("Not found courts");
            var newCourts = _mapper.Map<ICollection<CourtigCourtTimeSlotDto>>(courts);
            return Ok(newCourts);
        }

        [HttpGet("Court/{id}")]
        [ProducesResponseType(200, Type = typeof(Court))]
        public async Task<IActionResult> GetCourt(int id)
        {
            var court = await _courtRepository.GetCourt(id);
            if (court == null)
                return NotFound("Not found court");
            var newCourt = _mapper.Map<CourtigCourtTimeSlotDto>(court);
            return Ok(newCourt);
        }

        [HttpPost("Court/{id}")]
        [ProducesResponseType(200, Type = typeof(bool))]
        public async Task <IActionResult> CreateCourt(int id,[FromForm] CourtDto court)
        {
            var newCourt = await _courtRepository.AddCourt(id,_mapper.Map<Court>(court));
            if (newCourt == null)
                return BadRequest("Add court Failed");
            if (court.Files != null && court.Files.Count > 0)
            {
                var resultUrls = await _cloudinaryServies.UploadFiles(court.Files);
                if (resultUrls.Count != court.Files.Count)
                {
                    return BadRequest("Add image url Failed");
                }
                List<Media> medias = await _mediaRepository.AddMedia(newCourt.Id, resultUrls);
                if (medias == null)
                    return BadRequest("Add media Failed");
                newCourt.Medias = medias;
            }
            var _newCourt = _mapper.Map<CourtIdDto>(newCourt);
            return Ok(_newCourt);
        }

        [HttpPut("Court/{id}")]
        [ProducesResponseType(200, Type = typeof(Court))]
        public async Task<IActionResult> UpdateCourt(int id,[FromForm] CourtDto court)
        {
            var oldCourt = await _courtRepository.GetCourt(id);
            if (oldCourt == null)
                return BadRequest("Have not court");
            var newCourt = _mapper.Map(court, oldCourt);
            var courtRes = await _courtRepository.UpdateCourt(_mapper.Map<Court>(newCourt));
            if (courtRes == null)
                return BadRequest("Update court Failed");
            
            if(court.Files != null && court.Files.Count > 0)
            {
                var resultUrls = await _cloudinaryServies.UploadFiles(court.Files);
                if (resultUrls.Count != court.Files.Count)
                {
                    return BadRequest("Add image url Failed");
                }
                List<Media> medias = await _mediaRepository.AddMedia(newCourt.Id, resultUrls);
                if (medias == null)
                    return BadRequest("Add media Failed");
                newCourt.Medias = medias;
            }
            var _courtRes = _mapper.Map<CourtIdDto>(courtRes);
            return Ok(_courtRes);
        }

        [HttpDelete("Court/{id}")]
        [ProducesResponseType(200, Type = typeof(bool))]
        public async Task<IActionResult> DeleteCourt(int id)
        {
            var result = await _courtRepository.DeleteCourt(id);
            if (!result)
                return BadRequest("Delete court Failed");
            return Ok(result);
        }
    }


}
