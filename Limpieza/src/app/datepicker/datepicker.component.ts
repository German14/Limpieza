import {Component, OnInit} from '@angular/core';
import {Calendar} from '@fullcalendar/core';
import {DataServiceClients} from "../service/serviceClients";
import {ActivatedRoute} from '@angular/router';
import {isNullOrUndefined} from "util";
import {DatePickerService} from "./service/datePicker.service";

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})

export class DatepickerComponent implements OnInit {

  events : any[] = [];
  private  firstParam: string;
  constructor(private service: DataServiceClients , private route: ActivatedRoute,
              private DatePickerService: DatePickerService) {
    this.firstParam = this.route.snapshot.queryParamMap.get('id');
  }

  callServiceIndividual(calendar, calendarEl) {
    this.service.getRepoClient({ id: this.firstParam}).subscribe((value ) =>{
      value.map(data =>{
        this.events.push({
          id: data.id,
          resourceId: 'portal',
          start: data.Portal,
          end: data.Portal,
          title: data.Name
        });
        this.events.push({
          id: data.id,
          resourceId: 'tiro',
          start: data.Tiro,
          end: data.Tiro,
          title: data.Name
        });
        this.events.push({
          id: data.id,
          resourceId: 'garaje',
          start: data.Garaje,
          end: data.Garaje,
          title: data.Name
        });
      });
      this.DatePickerService.inicialize(calendar, calendarEl, this.events);
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
          title: data.Name
        });
        this.events.push({
          id: data.id,
          resourceId: 'tiro',
          start: data.Tiro,
          end: data.Tiro,
          title: data.Name
        });
        this.events.push({
          id: data.id,
          resourceId: 'garaje',
          start: data.Garaje,
          end: data.Garaje,
          title: data.Name
        });
      });
      this.DatePickerService.inicialize(calendar, calendarEl, this.events);
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
