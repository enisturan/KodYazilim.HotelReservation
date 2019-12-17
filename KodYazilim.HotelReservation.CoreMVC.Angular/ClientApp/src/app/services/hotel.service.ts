import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Hotel } from "../hotel/hotel";
import { HttpClient } from "@angular/common/http";
import { Rezervasyon } from '../rezervasyon';

@Injectable()
export class HotelService {
    constructor(private httpClient: HttpClient) { }

    path = "http://localhost:9220/api/";

  getHotels():Observable<Hotel[]> {
    return this.httpClient.get<Hotel[]>(this.path + "hotel");
  }

  getHotelById(id):Observable<Hotel> {
    return this.httpClient.get<Hotel>(this.path + "hotel/" + id);
  }

  add(reservationData:any):Observable<Rezervasyon[]> {
      return this.httpClient.post<Rezervasyon[]>(this.path + "reservation", reservationData);
  }
}
