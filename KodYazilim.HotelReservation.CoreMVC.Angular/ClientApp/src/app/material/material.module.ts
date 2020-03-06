import { NgModule } from '@angular/core';
import { MatTableModule, MatPaginatorModule, MatSnackBarModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
    declarations: [],
    imports: [],
    exports: [
        MatTableModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        FormsModule,
        MatSnackBarModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        BrowserModule
    ],
    
    providers: [],
    bootstrap: []
})
export class MaterialModule { }
