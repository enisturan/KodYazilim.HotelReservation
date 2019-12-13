using System;
  
namespace KodProje.Models
{
    public class HotelPrice
    {
        public int Id { get; set; }
        public string SubRegion { get; set; }
        public string RegionName { get; set; }
        public string HotelName { get; set; }
        public string Currency { get; set; }
        public string RoomName { get; set; }
        public int RoomId { get; set; }
        public string BoardName { get; set; }
        public DateTime CheckInDate { get; set; }
        public short Duration { get; set; }
        public short NumberOfAd { get; set; }
        public short NumberOfChd { get; set; }
        public short ChlAgeMin { get; set; }
        public short ChlAgeMax { get; set; }
        public short Ch2AgeMin { get; set; }
        public short Ch2AgeMax { get; set; }
        public short Ch3AgeMin { get; set; }
        public short Ch3AgeMax { get; set; }
        public decimal Price { get; set; }
        public DateTime PayDate { get; set; }
    }
}
