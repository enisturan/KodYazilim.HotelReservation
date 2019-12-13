using AutoMapper;
using KodYazilim.HotelReservation.CoreMVC.Angular.Dtos;
using KodYazilim.HotelReservation.CoreMVC.Angular.Models;

namespace KodYazilim.HotelReservation.CoreMVC.Angular.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<HotelPrice, HotelForListDto>();
        }
    }
}
