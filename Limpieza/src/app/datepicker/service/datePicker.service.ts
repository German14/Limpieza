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
  public infoClick (events:any ,info: any): any {
    return  {
      Garaje: events.filter((data) =>{
        return data.id === +info.event.id && data.resourceId === 'garaje'
      })[0].start,
      Name: info.event._def.title,
      Observations: info.event.extendedProps.observacion,
      Phone: info.event.extendedProps.phone,
      Portal: events.filter((data) =>{
        return data.id === +info.event.id && data.resourceId === 'portal'
      })[0].start,
      Tiro: events.filter((data) =>{
        return data.id === +info.event.id && data.resourceId === 'tiro'
      })[0].start,
      id: info.event.id
    };
  }

  public placeInfoG(place: string, events: any, oldInfo: any) {
    if(place === 'garaje') {
      return oldInfo.event.start;
    } else {
      return events.filter((data) =>{
        return data.id === +oldInfo.event.id && data.resourceId === 'garaje'
      })[0].start
    }
  }
  public placeInfoT(place: string, events: any, oldInfo: any) {
    if(place === 'tiro') {
      return oldInfo.event.start;
    } else {
      return events.filter((data) => {
        return data.id === +oldInfo.event.id && data.resourceId === 'tiro'
      })[0].start
    }
  }
  public placeInfoP(place: string, events: any, oldInfo: any) {
    if(place === 'portal') {
      return oldInfo.event.start;
    } else {
       return events.filter((data) => {
         return data.id === +oldInfo.event.id && data.resourceId === 'portal'
      })[0].start
    }
  }

  public infoDrag (events:any ,oldInfo: any, place: string): any {
    return {
      Garaje: this.placeInfoG(place, events, oldInfo),
      Name: oldInfo.event._def.title,
      Observations: oldInfo.event.extendedProps.observacion,
      Phone: oldInfo.event.extendedProps.phone,
      Portal:this.placeInfoP(place, events, oldInfo),
      Tiro: this.placeInfoT(place, events, oldInfo),
      id: oldInfo.event.id
    };
  }

  public inicialize(calendar , calendarEl: any , events:any, buttonDataBase: ButtonsNavigationComponent) {
    let draggableEl = document.getElementById('mydraggable');
    calendar = new Calendar(calendarEl, {

      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      plugins: [dayGridPlugin, listPlugin, timeGridPlugin, resourceTimelinePlugin, resourceDayGridPlugin, interactionPlugin, dayGrid],
      eventClick: (info) => {
        buttonDataBase.openForm(this.infoClick(events,info), 'FormClientsComponent');
      },
      eventDrop: (oldInfo) => {
        switch (oldInfo.event._def.resourceIds[0]) {
          case 'portal':
            buttonDataBase.openForm(this.infoDrag(events, oldInfo, 'portal'), 'FormClientsComponent');
            break;
          case 'tiro':
            buttonDataBase.openForm(this.infoDrag(events, oldInfo, 'tiro'), 'FormClientsComponent');
            break;
          case 'garaje':
            buttonDataBase.openForm(this.infoDrag(events, oldInfo, 'garaje'), 'FormClientsComponent');
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
      defaultView: 'dayGridMonth',
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


