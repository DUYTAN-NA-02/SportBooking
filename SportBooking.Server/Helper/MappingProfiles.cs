using AutoMapper;
using SportBooking.Server.Dto;
using SportBooking.Server.models;

namespace SportBooking.Server.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // User
            // Just get information
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
            CreateMap<User, UserNotTokenDto>();
            CreateMap<UserNotTokenDto, User>();

            // Register user
            CreateMap<UserRegisterDto, User>();
            // Login User
            CreateMap<UserLoginDto, User>();

            // Big court
            CreateMap<BigCourtCreateDto, BigCourt>();
            CreateMap<BigCourt, BigCourtCreateDto>();
            CreateMap<BigCourt, BigCourtDetailDto>();
            CreateMap<BigCourtDetailDto, BigCourt>();
            CreateMap<BigCourt, BigCourtNotCourtsDto>();
            CreateMap<BigCourtNotCourtsDto, BigCourt>();


            // Court
            CreateMap<Court, CourtDto>();
            CreateMap<CourtDto, Court>();
            CreateMap<Court, CourtBigCourtDto>();
            CreateMap<CourtBigCourtDto, Court>();
            CreateMap<Court, CourtigCourtTimeSlotDto>();
            CreateMap<CourtigCourtTimeSlotDto, Court>();
            CreateMap<Court, CourtIdDto>();
            CreateMap<CourtIdDto, Court>();



            // TimeSlot
            CreateMap<TimeSlot, TimeSlotDto>();
            CreateMap<TimeSlotDto, TimeSlot>();
            CreateMap<TimeSlot, TimeSlotDetail>();
            CreateMap<TimeSlotDetail, TimeSlot>();

            // Booking
            CreateMap<Booking, BookingDto>();
            CreateMap<BookingDto, Booking>();
            CreateMap<BookingUpdateDto, Booking>();
            CreateMap<Booking, BookingUpdateDto>();
            CreateMap<Booking, BookingDtoRes>();
            CreateMap<BookingDtoRes, Booking>();
            CreateMap<Booking, BookingDtoResDetail>();
            CreateMap<BookingDtoResDetail, Booking>();
        }
    }
}
