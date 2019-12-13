import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HotelService } from "../services/hotel.service";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { Rezervasyon } from "../rezervasyon";

@Component({
  selector: "app-rezervasyon",
  templateUrl: "./rezervasyon.component.html",
  styleUrls: ["./rezervasyon.component.css"]
})
export class RezervasyonComponent implements OnInit {
  hotelName: string;
  roomName: string;
  checkInDate: string;
  payDate: string;
  duration: number;
  price: number;

  adultArray: any[] = [];
  childArray: any[] = [];

  rezervasyon: Rezervasyon;
  rezForm: FormGroup;
  items: FormArray;

  constructor(
    private hotelservice: HotelService,
    private activatedRouter: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  createRezervasyon() {
    this.rezForm = this.fb.group({
      nameSurname: ["", Validators.required],
      birthday: ["", Validators.required],
      price: ["", Validators.required],
      hotelName: ["", Validators.required],
      roomName: ["", Validators.required],
      checkInDate: ["", Validators.required],
      payDate: ["", Validators.required],
      duration: ["", Validators.required]

    });
  }

  ngOnInit() {
    var clickedRowId = this.activatedRouter.snapshot.paramMap.get("id");
    this.hotelservice.getHotelById(clickedRowId).subscribe(
      data => {
        console.log(data);

        
        this.hotelName = data.hotelName;
        this.roomName = data.roomName;
        this.checkInDate = data.checkInDate;
        this.payDate = data.payDate;
        this.duration = data.duration;
        this.price = data.price;

        var adultCount = data.numberOfAd;
        for (let i = 0; i < adultCount; i++) {
          this.adultArray.push(i);
        }

        var childCount = data.numberOfChd;
        for (let i = 0; i < childCount; i++) {
          this.childArray.push(i);
        }
      },
      err => {
        console.error("Hata oluştu: ", err);
      }
    );
    this.createRezervasyon();
  }

  add() {
    if (this.rezForm.valid) {
      var dizi = [Object.assign({}, this.rezForm.value)];
      // let dizi:Rezervasyon[];
      this.hotelservice.add(dizi).subscribe(data => {
        console.log("gelen add sonucu:", data);
        if (data.length == dizi.length)
          alert("ekleme başarılı. Rezervasyon numaranız: " + data[0].Id);
        else alert("ekleme olmadı");
      });
    }
  }
}
