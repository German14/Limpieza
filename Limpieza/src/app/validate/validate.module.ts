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
import {ValidateRoutingModule} from "./validate-routing.module";
import {ValidateComponent} from "./validate.component";



@NgModule({
  declarations: [ValidateComponent],
  imports: [
    CommonModule,
    ValidateRoutingModule,
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
export class ValidateModule { }
