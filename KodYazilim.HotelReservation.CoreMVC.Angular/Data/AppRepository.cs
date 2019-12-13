using KodYazilim.HotelReservation.CoreMVC.Angular.Models;
using System.Collections.Generic;
using System.Linq;

namespace KodYazilim.HotelReservation.CoreMVC.Angular.Data
{
    public class AppRepository : IAppRepository
    {
        private DataContext _context;

        public AppRepository(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public List<HotelPrice> GetPrice()
        {
            var hotels = _context.HotelPrices.ToList();
            return hotels;
        }

        public List<Reservation> GetRezervasyons()
        {
            var rezerv = _context.Reservations.ToList();
            return rezerv;
        }

        public bool SaveAll()
        {
            return _context.SaveChanges() > 0;
        }
    }
}
