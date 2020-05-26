import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { HotelService } from "../services/hotel.service";
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from "@angular/material";
import { Hotel } from "./hotel";
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RezervasyonComponent } from "../rezervasyon/rezervasyon.component";
import { Router } from "@angular/router";


@Component({
    selector: "app-hotel",
    templateUrl: "./hotel.component.html",
    styleUrls: ["./hotel.component.css"],
    providers: [HotelService]
})
export class HotelComponent implements OnInit {
    children: any[] = [];
    adult: any[] = [];

    displayedColumns: string[] = [
        "hotelName",
        "regionName",
        "checkInDate",
        "numberOfAd",
        "numberOfChd",
        "payDate",
        "book"
    ];

    dsHotels: any = new MatTableDataSource<Hotel[]>([]);
    @ViewChild(MatPaginator, { read: true }) paginator: MatPaginator;

    rezervasyon: RezervasyonComponent;

    form = new FormGroup({
        name: new FormControl(''),
        region: new FormControl(''),
        adult: new FormControl(1),
        chd: new FormControl(0),
        startDate: new FormControl(),
        endDate: new FormControl(),
    });

    filtered: any[];
    showList = false;
    showMenu = false;


    constructor(
        private hotelservice: HotelService,
        private dialog: MatDialog,
        private router: Router
    ) { }

    name = '';
    regions: string[];
    hotels: Hotel[] = [];

    filteredHotels: Observable<string[]>;
    filteredRegions: Observable<string[]>;
    filteredHotelNames: Observable<string[]>;
    filteredHotelsArr: Hotel[];


    ngOnInit() {
        this.filteredHotelsArr = [...this.hotels]

        this.regions = this.hotels.reduce((arr: string[], current) => {
            if (!arr.includes(current.regionName)) {
                arr.push(current.regionName);
            }
            return arr;
        }, []);

        let self = this
        this.filteredHotelNames = this.form.get("name").valueChanges
            .pipe(
                startWith(''),
                map(v => {
                    let copy = [...self.hotels]
                    let filteredHotelNames = self.filterHotelsByName(v, copy)
                    self.filteredHotelsArr = self.hotels.filter(h => filteredHotelNames.indexOf(h.hotelName) > -1)
                    self.filteredRegions = of(self.filteredHotelsArr.map(h => h.regionName))
                    return filteredHotelNames
                })
            );

        console.log("this.filteredHotelsArr: ", this.filteredHotelsArr)

        this.filteredRegions = this.form.get("region").valueChanges
            .pipe(
                startWith(''),
                map(value => self.filterByRegion(value, self.filteredHotelsArr).map(h => h.regionName))
            );

        this.form.get("adult").valueChanges.
            subscribe(v => {
                this.adult = new Array(v).map(e => new Object)
            });

        this.form.get("chd").valueChanges
            .subscribe(v => {
                this.children = new Array(v).map(e => new Object)
            });


        this.hotelservice.getHotels().subscribe(
            data => {
                this.hotels = data;
                this.dsHotels.data = data;
                this.dsHotels.paginator = this.paginator;
            },
            err => {
                console.error("Hata oluştu: ", err);
            }
        );
    }

    private filterHotelsByName(value, hotelsData: Hotel[] = [...this.hotels]): string[] {
        const name = value.toLowerCase();

        return hotelsData
            .map(x => x.hotelName)
            .filter(option => option.toLowerCase().includes(name));
    }

    private filterByRegion(value: string, hotelsData: Hotel[] = [...this.hotels]): Hotel[] {
        const region = value.toLowerCase();

        return [...hotelsData].filter(hotel => hotel.regionName.toLowerCase().includes(region));
    }

    private isEqual(date1: Date, date2: Date) {
        return date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear();
    }

    private isDataEqualToDate(value1: any, date2: Date) {
        if (value1 == null) return true;
        return this.isEqual(new Date(value1), date2);
    }

    private filterByDates() {
        let startDate = this.form.get("startDate").value
        let endDate = this.form.get("endDate").value
        this.dsHotels.data = this.filterByDate(startDate, endDate, [...this.filteredHotelsArr]);
    }

    private filterByDate(startDate, endDate, hotelsData): Hotel[] {
        return [...hotelsData].filter(
            x => this.isDataEqualToDate(startDate, new Date(x.checkInDate))
                && this.isDataEqualToDate(endDate, new Date(x.payDate))
        );
    }


    filterPersonCount() {
        let numOfAdult = this.form.get("adult").value
        let numOfChild = this.form.get("chd").value
        let result = this.filteredHotelsArr.filter(x => x.numberOfAd == numOfAdult && x.numberOfChd == numOfChild);
        return result;
    }

    search() {
        this.showList = true;
        let hotelsData = [...this.hotels];
        let hotelName = this.form.get("name").value
        if (hotelName) {
            let hotelNames: string[] = this.filterHotelsByName(hotelName, [...hotelsData]);
        }

        let regionName = this.form.get("region").value
        hotelsData = this.filterByRegion(regionName, [...hotelsData]);

        let startDate = this.form.get("startDate").value
        let endDate = this.form.get("endDate").value
        this.filteredHotelsArr = this.filterByDate(startDate, endDate, [...hotelsData]);
        this.dsHotels.data = this.filterPersonCount();

    }

    search2() {
        this.showMenu = true;
    }

    openRezervasyonPage(obj: Hotel) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = false;
        dialogConfig.width = "35%";
        const modalRef = this.dialog.open(RezervasyonComponent, dialogConfig);
        modalRef.componentInstance.hotel = obj;
    }

    navigate() {
        this.router.navigate(["detail"]);
    }
}