import {ApplicationModule, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from "@angular/material";
import {ButtonNavigationModule} from "../buttons-navigation/button-navigation.module";
import {ReactiveFormsModule} from "@angular/forms";
import {FileUploadComponent} from './file-upload.component';
import {FileUploadRoutingModule} from "./file-upload-routing.module";



@NgModule({
  declarations: [FileUploadComponent],
  exports: [
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    FileUploadRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    ButtonNavigationModule,
    ReactiveFormsModule


  ]
})
export class FileUploadModule { }
