using KodProje.Models;
using System.Collections.Generic;

namespace KodProje.Data
{
    public interface IAppRepository
    {
        List<HotelPrice> GetPrice();
        List<Reservation> GetRezervasyons();
        void Add<T>(T entity) where T : class;
        bool SaveAll();
    }
}
