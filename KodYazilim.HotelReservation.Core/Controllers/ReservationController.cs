﻿using AutoMapper;
using KodProje.Data;
using KodProje.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace KodProje.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IAppRepository _appRepository;
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ReservationController(IAppRepository appRepository, DataContext context)
        {
            _context = context;
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
        public ActionResult Add([FromBody] Reservation[] rezervasyon)
        {
            foreach (var r in rezervasyon)
            {
                _appRepository.Add(r);
                _appRepository.SaveAll();
            }

            return Ok(rezervasyon);
        }
    }
}
    
