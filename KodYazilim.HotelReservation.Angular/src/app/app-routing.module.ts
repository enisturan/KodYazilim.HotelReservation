import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RezervasyonComponent } from './rezervasyon/rezervasyon.component';
import { HotelComponent } from './hotel/hotel.component';


export const routes: Routes = [
  {path: 'hotels', component: HotelComponent},
  {path: 'rezervasyon/:id', component: RezervasyonComponent},
  {path: "**", redirectTo: "hotels", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
