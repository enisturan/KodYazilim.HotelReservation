import { Component, OnInit, ViewChild } from "@angular/core";
import { HotelService } from "../services/hotel.service";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { Hotel } from "./hotel";
import { Router } from "@angular/router";

@Component({
  selector: "app-hotel",
  templateUrl: "./hotel.component.html",
  styleUrls: ["./hotel.component.css"],
  providers: [HotelService]
})
export class HotelComponent implements OnInit {
  displayedColumns: string[] = [
    "hotelName",
    "checkInDate",
    "numberOfAd",
    "numberOfChd",
    "payDate",
    "book"
  ];

  dsHotels: any = new MatTableDataSource<Hotel[]>([]);
    @ViewChild(MatPaginator, { read: true }) paginator: MatPaginator;

    constructor(private hotelservice: HotelService,
        private router: Router) { }

  ngOnInit() {
    this.hotelservice.getHotels().subscribe(
      data => {
        this.dsHotels.data = data;
        this.dsHotels.paginator = this.paginator;
      },
      err => {
        console.error("Hata oluştu: ", err);
      }
    );
  }
  gotoRezervasyonPage(row: { id: any }) {
    this.router.navigate(["rezervasyon", row.id]);
  }
}
