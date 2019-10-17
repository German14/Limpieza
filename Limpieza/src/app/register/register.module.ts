import {ApplicationModule, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {ButtonNavigationModule} from '../buttons-navigation/button-navigation.module';
import {ReactiveFormsModule} from '@angular/forms';
import {FileUploadModule} from '../file-upload/file-upload.module';
import {RegisterComponent} from "./register.component";
import {RegisterRoutingModule} from "./register-routing.module";



@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FileUploadModule,
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
export class RegisterModule { }
