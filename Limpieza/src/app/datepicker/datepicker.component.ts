import {Component, OnInit} from '@angular/core';
import {Calendar} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import {DataServiceClients} from "../service/serviceClients";
import {ActivatedRoute} from '@angular/router';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})

export class DatepickerComponent implements OnInit {

  events : any[] = [];
  private  firstParam: string;
  constructor(private service: DataServiceClients , private route: ActivatedRoute) {
    this.firstParam = this.route.snapshot.queryParamMap.get('id');

  }

  inicialize(calendar , calendarEl: any) {

    calendar = new Calendar(calendarEl, {
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      plugins: [dayGridPlugin, listPlugin, timeGridPlugin, resourceTimelinePlugin],
      now: new Date(),
      editable: true, // enable draggable events
      aspectRatio: 1.8,
      scrollTime: '00:00', // undo default 6am scrollTime
      header: {
        left: 'today prev,next',
        center: 'title',
        right: 'resourceTimelineThreeDays,timeGridWeek,dayGridMonth,listWeek'
      },
      defaultView: '',
      views: {
        resourceTimelineThreeDays: {
          type: 'resourceTimeline',
          duration: {days: 3},
          buttonText: '3 day'
        }
      },
      resourceLabelText: 'Rooms',
      resources: [
        {id: 'tiro', title: 'Tiro', eventColor: 'red'},
        {id: 'portal', title: 'Portal', eventColor: 'green'},
        {id: 'garaje', title: 'Garaje', eventColor: 'yellow'},

      ],
      events: this.events
    });

    calendar.render();
  }
  ngOnInit(): void {
    let calendar: Calendar;
    let calendarEl = document.getElementById('calendar');

    if (!isNullOrUndefined(this.firstParam)) {
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
        this.inicialize(calendar, calendarEl)

      })

    } else {
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
        this.inicialize(calendar, calendarEl)


      });
    }


  }


}
