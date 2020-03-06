import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { HotelService } from "../services/hotel.service";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { Hotel } from "./hotel";
import { Router } from "@angular/router";
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, flatMap } from 'rxjs/operators';


@Component({
    selector: "app-hotel",
    templateUrl: "./hotel.component.html",
    styleUrls: ["./hotel.component.css"],
    providers: [HotelService]
})

export class HotelComponent implements OnInit {
    @Input() childCount: number = 0;

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


    hotelName: string;
    regionName: string;
    startDate: Date;
    endDate: Date;
    adult: number = 1;
    chd: number = 0;
    filtered: any[];
    //showList = false;

    constructor(private hotelservice: HotelService,
        private router: Router,
        private formBuilder: FormBuilder
    ) { }

    name = 'Angular';
    form: FormGroup;
    hotels: Hotel[] = [];

    filteredHotels: Observable<string[]>;
    filteredRegions: Observable<string[]>;

    private formControls: {
        name: FormControl;
        region: FormControl
    };

    private regions: string[];

    ngOnInit() {

        this.regions = this.hotels.reduce((arr: string[], current) => {
            if (!arr.includes(current.regionName)) {
                arr.push(current.regionName);
            }
            return arr;
        }, []);

        this.formControls = {
            name: this.formBuilder.control(''),
            region: this.formBuilder.control('')
        };

        this.form = this.formBuilder.group({
            name: this.formControls.name,
            region: this.formControls.region
        });

        this.filteredHotels = this.formControls.name.valueChanges
            .pipe(
                startWith(''),
                map(value => this.filterHotels(value))
            );

        this.filteredRegions = this.formControls.region.valueChanges
            .pipe(
            startWith(''),
            map(value => this.filterRegions(value).map(h => h.regionName))
            );

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

    private filterHotels(value: string): string[] {
        const name = value.toLowerCase();

        return this.hotels
            .map(x => x.hotelName)
            .filter(option => option.toLowerCase().includes(name));
    }

    private filterRegions(value: string): Hotel[] {
        const region = value.toLowerCase();

        return this.hotels
            .filter(hotel => hotel.regionName.toLowerCase().includes(region));
    }


    private isEqual(date1: Date, date2: Date) {
        return date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear();
    }

    private isDataEqualToDate(value1: any, date2: Date) {
        if (value1 == null) return true;
        return this.isEqual(new Date(value1), date2);
    }

    private getFilteredDate() {
        return this.hotels.filter(
            x => this.isDataEqualToDate(this.startDate, new Date(x.checkInDate))
                && this.isDataEqualToDate(this.endDate, new Date(x.payDate))
        );
    }

    changeDate() {
        this.dsHotels.data = this.getFilteredDate();
    }


    filterAge() {
        this.filtered = this.hotels.filter(x => x.numberOfAd == this.adult && x.numberOfChd == this.chd);
        //this.dsHotels.data = filtered;
    }


    gotoRezervasyonPage(row: { id: any }) {
        this.router.navigate(["rezervasyon", row.id]);
    }


    //search() {
    //    this.filterHotels("value");
    //    this.filterRegions("value");
    //    //    this.changeDate();
    //    this.showList = true;
    //}
}
