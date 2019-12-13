using AutoMapper;
using KodProje.Dtos;
using KodProje.Models;


namespace KodProje.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<HotelPrice, HotelForListDto>();
        }
    }
}
