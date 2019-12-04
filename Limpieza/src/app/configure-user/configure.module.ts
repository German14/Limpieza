import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatDatepickerModule, MatDialogModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {ButtonNavigationModule} from '../buttons-navigation/button-navigation.module';
import {ConfigureUserComponent} from "./configure-user.component";
import {ConfigureUserRoutingModule} from "./configureUser-routing.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [ConfigureUserComponent],
  imports: [
    CommonModule,
    ConfigureUserRoutingModule,
    MatCardModule,
    ButtonNavigationModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatDialogModule
  ],
  providers:[]
})
export class ConfigureModule { }
