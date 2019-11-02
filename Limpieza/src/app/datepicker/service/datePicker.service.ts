import {Injectable} from '@angular/core';
import {Calendar} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";



@Injectable()
export class DatePickerService {
public inicialize(calendar , calendarEl: any , events:any) {
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
      events: events
    });

    calendar.render();
  }
}


