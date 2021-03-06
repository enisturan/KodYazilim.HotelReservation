﻿using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace KodProje.Models
{
    [Table("Reservation")]
    public class Reservation
    {
        public int Id { get; set; }
        public string NameSurname { get; set; }
        public DateTime Birthday { get; set; }
        public string HotelName { get; set; }
        public string RoomName { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime PayDate { get; set; }
        public int Duration { get; set; }
        public decimal? Price { get; set; }
    }
}
