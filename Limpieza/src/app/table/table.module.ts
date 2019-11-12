import {ApplicationModule, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import {TableComponent} from './table.component';
import {TableRoutingModule} from './table-routing.module';
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
import {ServiceModalsService} from '../service/interfaces/serviceModals.service';


@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    TableRoutingModule,
    FileUploadModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    ButtonNavigationModule,
    ReactiveFormsModule
  ],
  providers: [ServiceModalsService]
})
export class TableModule { }
