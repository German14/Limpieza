import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {ButtonNavigationModule} from '../buttons-navigation/button-navigation.module';
import {ParseadorComponent} from "./parseador.component";
import {ParseadorRoutingModule} from "./parseador-routing.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [ParseadorComponent],
  imports: [
    CommonModule,
    ParseadorRoutingModule,
    MatCardModule,
    ButtonNavigationModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule
  ]
})
export class ParseadorModule { }
