using KodYazilim.HotelReservation.CoreMVC.Angular.Models;
using Microsoft.EntityFrameworkCore;

namespace KodYazilim.HotelReservation.CoreMVC.Angular.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options):base(options) { }
       
        public DbSet<HotelPrice> HotelPrices { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
    }
}
