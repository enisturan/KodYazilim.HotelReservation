import { Component, OnInit, Input } from "@angular/core";
import { HotelService } from "../services/hotel.service";
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, Form } from "@angular/forms";
import { MatDialogRef } from "@angular/material";
import { Hotel } from "../hotel/hotel";
import { of } from "rxjs";
import { Rezervasyon } from "../rezervasyon";

class Guest {
    nameSurname: String
    birthDate: String
}

@Component({
    selector: "app-rezervasyon",
    templateUrl: "./rezervasyon.component.html",
    styleUrls: ["./rezervasyon.component.css"]
})
export class RezervasyonComponent implements OnInit {

    @Input() hotel: Hotel;
    rezForm: FormGroup;
    guests: FormArray;
    rezervasyon: Rezervasyon;


    get adultArr(): FormArray {
        return this.rezForm.get('adultArray') as FormArray;
    }

    get childArr(): FormArray {
        return this.rezForm.get('childArray') as FormArray;
    }

    g: Guest = {
        "nameSurname": "",
        "birthDate": ""
    }

    constructor(
        private hotelservice: HotelService,
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<RezervasyonComponent>
    ) { }

    createItem(): FormGroup {
        return this.fb.group({
            adultArray: [],
            childArray: []
        });
    }

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
        console.log("I'm here");
    }

    ngOnInit() {

        this.createRezervasyon();
        console.log(this.rezForm)

        of(this.hotel).subscribe(
            data => {
                console.log(data);

                var adultCount = data.numberOfAd;
                var adultArr = this.rezForm.get('adultArray') as FormArray;
                let adult: any = {
                    "nameSurname": "",
                    "birthday": ""
                };

                for (let i = 0; i < adultCount; i++) {
                    adultArr.push(this.fb.group(this.g));
                }

                var childCount = data.numberOfChd;
                var childArr = this.rezForm.get('childArray') as FormArray;
                let child: any = {
                    "nameSurname": "",
                    "birthDate": ""
                };

                for (let i = 0; i < childCount; i++) {
                    childArr.push(this.fb.group(this.g));
                }

                this.rezForm.patchValue({
                    hotelName: data.hotelName,
                    price: data.price,
                    roomName: data.roomName,
                    checkInDate: data.checkInDate,
                    payDate: data.payDate,
                    duration: data.duration,
                });

                console.log("this.rezForm: ", this.rezForm)
            },
            err => {
                console.error("Hata oluştu: ", err);
            }
        );
    }

    closeReservationPage() {
        this.dialogRef.close();
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

            this.hotelservice.add(data).subscribe((data: any) => {
                console.log("gelen add sonucu:", data);
                alert("ekleme başarılı. Rezervasyon numaranız: " + data[0].id);
            });
        }
        this.closeReservationPage();
    }
}

