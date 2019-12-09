import {ApplicationModule, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatCardModule, MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {ButtonNavigationModule} from '../buttons-navigation/button-navigation.module';
import {ReactiveFormsModule} from '@angular/forms';
import {DeleteComponent} from './delete.component';
import {DeleteRoutingModule} from './delete-routing.module';



@NgModule({
  declarations: [DeleteComponent],
  exports: [
    DeleteComponent
  ],
  imports: [
    CommonModule,
    DeleteRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    ButtonNavigationModule,
    ReactiveFormsModule,
    MatDialogModule


  ]
})
export class DeleteModule { }
