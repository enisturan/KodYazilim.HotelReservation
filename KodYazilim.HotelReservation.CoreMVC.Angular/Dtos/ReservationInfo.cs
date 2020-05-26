using System;
using System.Collections.Generic;

namespace KodYazilim.HotelReservation.CoreMVC.Angular.Dtos {

    public class ReservationInfo {
        public List<Adult> adultArray { get; set; }
        public List<Child> childArray { get; set; }
        public Hotel hotelInfo { get; set; }
    }

    public class Hotel {
        public int price { get; set; }
        public string hotelName { get; set; }
        public string roomName { get; set; }
        public DateTime checkInDate { get; set; }
        public DateTime payDate { get; set; }
        public int duration { get; set; }
    }

    public class Adult {
        public string nameSurname { get; set; }
        public DateTime birthday { get; set; }
    }

    public class Child {
        public string nameSurname { get; set; }
        public DateTime birthday { get; set; }
    }
}
