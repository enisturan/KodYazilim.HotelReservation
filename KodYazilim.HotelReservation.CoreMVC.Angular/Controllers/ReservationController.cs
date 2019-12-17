using System;
using AutoMapper;
using KodYazilim.HotelReservation.CoreMVC.Angular.Data;
using KodYazilim.HotelReservation.CoreMVC.Angular.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Threading.Tasks;
using KodYazilim.HotelReservation.CoreMVC.Angular.Dtos;
using System.Collections.Generic;

namespace KodYazilim.HotelReservation.CoreMVC.Angular.Controllers
{
    /* 
     * [Route("api/[controller]")]   api/[controller] > localhost:1234/api/Reservation
     * [Route("api/rezervasyon")]    api/rezervasyon  > localhost:1234/api/rezervasyon
     */ 
    [Route("api/[controller]")] 
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IAppRepository _appRepository;
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ReservationController(IAppRepository appRepository, DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _appRepository = appRepository;
        }

        [HttpGet]
        public async Task<ActionResult> GetRezervasyons()
        {
            var rez = await _context.Reservations.ToListAsync();
            return Ok(rez);
        }
 
        [HttpGet("{int}")]
        public async Task<ActionResult> GetRezervasyon(int id)
        {
            var rez = await _context.Reservations.FirstOrDefaultAsync(h => h.Id == id);
            return Ok(rez);
        }
        
        [HttpPost]
        public ActionResult Add([FromBody] ReservationInfo reservationInfo)
        {
            var reservations = new List<Reservation>();
            foreach (var r in reservationInfo.adultArray)
            {
                var reservation = new Reservation {
                    NameSurname = r.nameSurname,
                    Birthday = r.birthday,

                    CheckInDate = reservationInfo.hotelInfo.checkInDate,
                    Duration = reservationInfo.hotelInfo.duration,
                    PayDate = reservationInfo.hotelInfo.payDate,
                    Price = reservationInfo.hotelInfo.price,
                    RoomName = reservationInfo.hotelInfo.roomName,
                    HotelName = reservationInfo.hotelInfo.hotelName,
                };
                _appRepository.Add(reservation);
                _appRepository.SaveAll();

                reservations.Add(reservation);
            }

            foreach (var r in reservationInfo.childArray)
            {
                var reservation = new Reservation {
                    NameSurname = r.nameSurname,
                    Birthday = r.birthday,

                    CheckInDate = reservationInfo.hotelInfo.checkInDate,
                    Duration = reservationInfo.hotelInfo.duration,
                    PayDate = reservationInfo.hotelInfo.payDate,
                    Price = reservationInfo.hotelInfo.price,
                    RoomName = reservationInfo.hotelInfo.roomName,
                    HotelName = reservationInfo.hotelInfo.hotelName,
                };
                _appRepository.Add(reservation);
                _appRepository.SaveAll();

                reservations.Add(reservation);
            }

            return Ok(reservations);
        }
    }
}
    
