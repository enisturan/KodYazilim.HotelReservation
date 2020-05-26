import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotelComponent } from './hotel/hotel.component';
import { RezervasyonComponent } from './rezervasyon/rezervasyon.component';
import { DetailComponent } from './detail/detail.component';
import { TestComponent } from './test/test.component';

export const routes: Routes = [
    { path: 'hotel', component: HotelComponent },
    { path: 'rezervazyon', component: RezervasyonComponent },
    { path: 'detail', component: DetailComponent },
    { path: 'test', component: TestComponent },
    { path: "**", redirectTo: "hotel"}
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
