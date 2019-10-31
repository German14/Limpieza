import {Component, OnInit} from '@angular/core';
import {Calendar} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})

export class DatepickerComponent implements OnInit {

  events : any[] = [ {id: '1', resourceId: 'a', start: '2019-02-07T02:00:00', end: '2019-02-07T07:00:00', title: 'event 1'},
    {id: '2', resourceId: 'b', start: '2019-02-07T05:00:00', end: '2019-02-07T22:00:00', title: 'event 2'},
    {id: '2', resourceId: 'c', start: '2019-02-07T05:00:00', end: '2019-02-07T22:00:00', title: 'event 3'},
    {id: '3', resourceId: 'c', start: '2019-02-06', end: '2019-02-08', title: 'event 8'},
    {id: '4', resourceId: 'b', start: '2019-02-07T03:00:00', end: '2019-02-07T08:00:00', title: 'event 4'},
    {id: '5', resourceId: 'a', start: '2019-02-07T00:30:00', end: '2019-02-07T02:30:00', title: 'event 5'}];
  ngOnInit(): void {

    let calendar: Calendar;
    let calendarEl = document.getElementById('calendar');
    calendar = new Calendar(calendarEl, {
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
        {id: 'a', title: 'Tiro', eventColor: 'red'},
        {id: 'b', title: 'Portal', eventColor: 'green'},
        {id: 'c', title: 'Garaje', eventColor: 'yellow'},

      ],
      events: this.events
    });

    calendar.render();
  }


}
