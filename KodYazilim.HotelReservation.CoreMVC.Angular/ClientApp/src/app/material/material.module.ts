import { NgModule } from '@angular/core';
import { MatTableModule, MatPaginatorModule, MatSnackBarModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatToolbarModule, MatIconModule, MatMenuModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RezervasyonComponent } from '../rezervasyon/rezervasyon.component';
import { HotelComponent } from '../hotel/hotel.component';
import { DetailComponent } from '../detail/detail.component';

@NgModule({
    declarations: [
        HotelComponent,
        RezervasyonComponent,
        DetailComponent,
    ],

    imports: [
        MatTableModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        FormsModule,
        MatSnackBarModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        BrowserModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
    ],
    providers: [],
    bootstrap: [],
    entryComponents: [RezervasyonComponent]
})
export class MaterialModule { }
