import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Hotel } from "../hotel/hotel";
import { HttpClient } from "@angular/common/http";
import { Rezervasyon } from '../rezervasyon';

@Injectable()
export class HotelService {
  constructor(private httpClient: HttpClient) {}
  path = "https://localhost:44303/api/";

  getHotels():Observable<Hotel[]> {
    return this.httpClient.get<Hotel[]>(this.path + "hotels");
  }

  getHotelById(id):Observable<Hotel> {
    return this.httpClient.get<Hotel>(this.path + "hotels/" + id);
  }

  add(rezervasyonlar:Rezervasyon[]):Observable<Rezervasyon[]> {
    return this.httpClient.post<Rezervasyon[]>(this.path + "rezervasyon", rezervasyonlar);
  }
}
