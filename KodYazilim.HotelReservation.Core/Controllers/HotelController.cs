﻿using AutoMapper;
using KodProje.Data;
using KodProje.Dtos;
using KodProje.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KodProje.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly IAppRepository _appRepository;
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public HotelController(IAppRepository appRepository, DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _appRepository = appRepository;
        }

        [HttpGet]
        public async Task<ActionResult> GetHotels()
        {
            var hotels = await _context.HotelPrices.ToListAsync();
            //var hotelsToReturn = _mapper.Map<List<HotelForListDto>>(hotels);
            return Ok(hotels);
        }
 
        [HttpGet("{id}")]
        public async Task<ActionResult> GetHotel(int id)
        {
            var hotel = await _context.HotelPrices.FirstOrDefaultAsync(h => h.Id == id);
            return Ok(hotel);
        }

        [HttpPost]
        public ActionResult Add([FromBody] Reservation rezervasyon)
        {
            _appRepository.Add(rezervasyon);
            _appRepository.SaveAll();
            return Ok(rezervasyon);

        }
    }
}
    
