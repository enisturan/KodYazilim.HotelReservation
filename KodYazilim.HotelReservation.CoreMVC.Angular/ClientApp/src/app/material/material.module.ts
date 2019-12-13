import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
   MatTableModule,
   MatPaginatorModule
  } from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [
    MatTableModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }
