using KodYazilim.HotelReservation.CoreMVC.Angular.Data;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace KodYazilim.HotelReservation.CoreMVC.Angular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private DataContext _context;

        public ValuesController(DataContext context)
        {
            _context = context;
        }

        // GET api/values
        [HttpGet]
        public ActionResult GetValues()
        {
            var values = _context.HotelPrices.ToList();
            return Ok(values);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult GetValue(int id)
        {
            var value = _context.HotelPrices.FirstOrDefault(h => h.Id == id);
            return Ok(value);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
