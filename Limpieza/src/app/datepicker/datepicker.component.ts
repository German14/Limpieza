import {Component, OnInit} from '@angular/core';
import {Calendar} from '@fullcalendar/core';
import {DataServiceClients} from "../service/serviceClients";
import {ActivatedRoute} from '@angular/router';
import {isNullOrUndefined} from "util";
import {DatePickerService} from "./service/datePicker.service";
import dayGridPlugin from "@fullcalendar/daygrid";
import {Button} from "selenium-webdriver";
import {ButtonsNavigationComponent} from "../buttons-navigation/buttons-navigation.component";

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})

export class DatepickerComponent implements OnInit {

  events : any[] = [];
  private  firstParam: string;
  constructor(private service: DataServiceClients , private route: ActivatedRoute,
              private DatePickerService: DatePickerService,
              private ButtonsNavigationComponent:ButtonsNavigationComponent) {
    this.firstParam = this.route.snapshot.queryParamMap.get('id');
  }

  callServiceIndividual(calendar, calendarEl) {
    this.service.getRepoClient({ id: this.firstParam}).subscribe((value ) =>{
      value.map(data =>{
        this.events.push({
          id: this.firstParam,
          resourceId: 'portal',
          start: data.Portal,
          end: data.Portal,
          title: data.Name,
          phone: data.Phone,
          observacion: data.Observations

        });
        this.events.push({
          id: this.firstParam,
          resourceId: 'tiro',
          start: data.Tiro,
          end: data.Tiro,
          title: data.Name,
          phone: data.Phone,
          observacion: data.Observations
        });
        this.events.push({
          id: this.firstParam,
          resourceId: 'garaje',
          start: data.Garaje,
          end: data.Garaje,
          title: data.Name,
          phone: data.Phone,
          observacion: data.Observations
        });
      });
      this.DatePickerService.inicialize(calendar, calendarEl, this.events, this.ButtonsNavigationComponent);
    })
  }

  callServiceGeneric(calendar, calendarEl) {
    this.service.getRepoClients().subscribe((value ) =>{
      value.map(data =>{
        this.events.push({
          id: data.id,
          resourceId: 'portal',
          start: data.Portal,
          end: data.Portal,
          title: data.Name,
          phone: data.Phone,
          observacion: data.Observations
        });
        this.events.push({
          id: data.id,
          resourceId: 'tiro',
          start: data.Tiro,
          end: data.Tiro,
          title: data.Name,
          phone: data.Phone,
          observacion: data.Observations
        });
        this.events.push({
          id: data.id,
          resourceId: 'garaje',
          start: data.Garaje,
          end: data.Garaje,
          title: data.Name,
          phone: data.Phone,
          observacion: data.Observations
        });
      });
      this.DatePickerService.inicialize(calendar, calendarEl, this.events, this.ButtonsNavigationComponent);
    });
  }
  ngOnInit(): void {
    let calendar: Calendar;

    let calendarEl = document.getElementById('calendar');


    if (!isNullOrUndefined(this.firstParam)) {
      this.callServiceIndividual(calendar, calendarEl);

       } else {
      this.callServiceGeneric(calendar,calendarEl);
    }

  }


}
