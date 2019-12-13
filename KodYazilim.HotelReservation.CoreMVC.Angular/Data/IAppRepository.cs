using KodYazilim.HotelReservation.CoreMVC.Angular.Models;
using System.Collections.Generic;

namespace KodYazilim.HotelReservation.CoreMVC.Angular.Data
{
    public interface IAppRepository
    {
        List<HotelPrice> GetPrice();
        List<Reservation> GetRezervasyons();
        void Add<T>(T entity) where T : class;
        bool SaveAll();
    }
}
