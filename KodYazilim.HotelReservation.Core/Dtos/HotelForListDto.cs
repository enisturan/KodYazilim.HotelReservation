using System;

namespace KodProje.Dtos
{
    public class HotelForListDto
    {
        public string HotelName { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime PayDate { get; set; }
        public short NumberOfAd { get; set; }
        public short NumberOfChd { get; set; }
    }
}
