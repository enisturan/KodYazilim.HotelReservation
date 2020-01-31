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
    rezervasyon: Rezervasyon;
    rezForm: FormGroup;
    items = FormArray;

   
    constructor(
        private hotelservice: HotelService,
        private activatedRouter: ActivatedRoute,
        private fb: FormBuilder

    ) { }

    createRezervasyon() {
        this.rezForm = this.fb.group({
            adultArray: this.fb.array([]),
            childArray: this.fb.array([]),
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

                var adultCount = data.numberOfAd;
                let adultArray = this.rezForm.controls.adultArray as FormArray;
                let adult: any = {
                    "nameSurname": "",
                    "birthday": ""
                };

                for (let i = 0; i < adultCount; i++) {
                    adultArray.push(this.fb.group(adult));
                }

                var childCount = data.numberOfChd;
                let childArray = this.rezForm.controls.childArray as FormArray;
                let child: any = {
                    "nameSurname": "",
                    "birthday": ""
                };

                for (let i = 0; i < childCount; i++) {
                    childArray.push(this.fb.group(child));
                }

                this.rezForm.patchValue({
                    hotelName: data.hotelName,
                    price: data.price,
                    roomName: data.roomName,
                    checkInDate: data.checkInDate,
                    payDate: data.payDate,
                    duration: data.duration,
                });
            },
            err => {
                console.error("Hata oluştu: ", err);
            }
        );
        this.createRezervasyon();
    }

    add() {
        if (this.rezForm.valid) {
            var data: any = {
                adultArray: this.rezForm.value.adultArray,
                childArray: this.rezForm.value.childArray,
                hotelInfo: {
                    "price": this.rezForm.value.price,
                    "hotelName": this.rezForm.value.hotelName,
                    "roomName": this.rezForm.value.roomName,
                    "checkInDate": this.rezForm.value.checkInDate,
                    "payDate": this.rezForm.value.payDate,
                    "duration": this.rezForm.value.duration,
                }
            };
            console.log("data:", data);

            this.hotelservice.add(data).subscribe( (data:any) => {
                console.log("gelen add sonucu:", data);
                alert("ekleme başarılı. Rezervasyon numaranız: " + data[0].id);
            });
        }
    }
}
