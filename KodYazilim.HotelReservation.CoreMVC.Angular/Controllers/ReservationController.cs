using AutoMapper;
using KodYazilim.HotelReservation.CoreMVC.Angular.Data;
using KodYazilim.HotelReservation.CoreMVC.Angular.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace KodYazilim.HotelReservation.CoreMVC.Angular.Controllers
{
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
    
