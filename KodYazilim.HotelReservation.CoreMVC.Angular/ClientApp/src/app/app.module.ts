import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HotelComponent } from './hotel/hotel.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RezervasyonComponent } from './rezervasyon/rezervasyon.component';




@NgModule({
    declarations: [
        AppComponent,
        HotelComponent,
        RezervasyonComponent,
    ],
    
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],

})
export class AppModule { }
