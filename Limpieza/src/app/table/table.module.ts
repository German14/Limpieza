import {ApplicationModule, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import {TableComponent} from "./table.component";
import {TableRoutingModule} from "./table-routing.module";
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from "@angular/material";
import {ButtonNavigationModule} from "../buttons-navigation/button-navigation.module";



@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    TableRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    ButtonNavigationModule


  ]
})
export class TableModule { }
