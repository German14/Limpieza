import {Injectable} from '@angular/core';
import {Calendar} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import dayGrid from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import resourceDayGridPlugin from '@fullcalendar/resource-daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {ButtonsNavigationComponent} from "../../buttons-navigation/buttons-navigation.component";


@Injectable()
export class DatePickerService {
  public buttonDataBase: ButtonsNavigationComponent;
  constructor(

  ) {

  }
  public inicialize(calendar , calendarEl: any , events:any, buttonDataBase: ButtonsNavigationComponent) {
    let draggableEl = document.getElementById('mydraggable');
    calendar = new Calendar(calendarEl, {
      schedulerLicenseKey: 'Datepicker Germán',
      plugins: [dayGridPlugin, listPlugin, timeGridPlugin, resourceTimelinePlugin, resourceDayGridPlugin, interactionPlugin, dayGrid],
      eventClick: function(info) {
        console.log(info.event)
        const row= {
          Garaje: info.event.start,
          Name: info.event._def.title,
          Observations: info.event.extendedProps.observacion,
          Phone: info.event.extendedProps.phone,
          Portal: info.event.start,
          Tiro: info.event.start,
          id: info.event.id
        };
        buttonDataBase.openForm(row, 'FormClientsComponent');
      },
      eventDrop: function(oldInfo) {
        switch (oldInfo.event._def.resourceIds[0]) {
          case 'portal':
            console.log(oldInfo)
            const row1 = {
              Garaje: oldInfo.oldEvent.start,
              Name: oldInfo.event._def.title,
              Observations: oldInfo.event.extendedProps.observacion,
              Phone: oldInfo.event.extendedProps.phone,
              Portal: oldInfo.event.start,
              Tiro: oldInfo.oldEvent.start,
              id: oldInfo.event.id // arreglar las fechas que no se están editando
            };

            buttonDataBase.openForm(row1, 'FormClientsComponent');
            break;
          case 'tiro':
            const row2 = {
              Garaje: oldInfo.oldEvent.start,
              Name: oldInfo.event._def.title,
              Observations: oldInfo.event.extendedProps.observacion,
              Phone: oldInfo.event.extendedProps.phone,
              Portal: oldInfo.oldEvent.start,
              Tiro: oldInfo.event.start,
              id: oldInfo.event.id
            };

            buttonDataBase.openForm(row2, 'FormClientsComponent');

            break;
          case 'garaje':
            const row3 = {
              Garaje: oldInfo.event.start,
              Name: oldInfo.event._def.title,
              Observations: oldInfo.event.extendedProps.observacion,
              Phone: oldInfo.event.extendedProps.phone,
              Portal: oldInfo.oldEvent.start,
              Tiro: oldInfo.oldEvent.start,
              id: oldInfo.event.id
            };
            buttonDataBase.openForm(row3, 'FormClientsComponent');
            break;

        }

      },
      droppable: true,
      now: new Date(),
      editable: true, // enable draggable events
      aspectRatio: 1.8,
      scrollTime: '00:00', // undo default 6am scrollTime
      header: {
        left: 'today prev,next',
        center: 'title',
        right: 'resourceTimelineThreeDays,timeGridWeek,dayGridMonth,listWeek, resourceDayGridDay'
      },
      defaultView: 'resourceDayGridDay',
      views: {
        resourceTimelineThreeDays: {
          type: 'resourceTimeline',
          duration: {days: 3},
          buttonText: '3 day'
        },
        resourceDay: {
          type: 'resourceDayGridDay',
          buttonText: 'resource days'
        }
      },
      resourceLabelText: 'Posibilidades',
      resources: [
        {id: 'tiro', title: 'Tiro', eventColor: 'red'},
        {id: 'portal', title: 'Portal', eventColor: 'green'},
        {id: 'garaje', title: 'Garaje', eventColor: 'yellow'},
      ],

      events: events,
    });

    calendar.render();
  }
}


