import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {ButtonNavigationModule} from '../buttons-navigation/button-navigation.module';
import {DatepickerComponent} from "./datepicker.component";
import {DatepickerRoutingModule} from "./datepicker-routing.module";
import {CalendarModule} from "angular-calendar";
import {DatePickerService} from "./service/datePicker.service";
import {ServiceModalsService} from "../service/interfaces/serviceModals.service";
import {ServiceDatapickerService} from '../service/interfaces/serviceDatapicker.service';


@NgModule({
  declarations: [DatepickerComponent],
  imports: [
    CommonModule,
    DatepickerRoutingModule,
    MatCardModule,
    ButtonNavigationModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CalendarModule
  ],
  providers: [DatePickerService,ServiceModalsService,ServiceDatapickerService]
})
export class DatepickerModule { }
