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
import {DataServiceClients} from "../../service/serviceClients";
import {MatTableDataSource} from "@angular/material";
import {GithubIssue} from "../../service/service";
import {ServiceModalsService} from "../../service/interfaces/serviceModals.service";

@Injectable()
export class DatePickerService {
  public buttonDataBase: ButtonsNavigationComponent;
  public dataClient: MatTableDataSource<GithubIssue>;


  constructor( private tableDataBaseClient: DataServiceClients,
               private serviceModal: ServiceModalsService ) {}
  ngOnInit() {}

  public infoClick (events:any ,info: any): any {
    return  {
      Garaje: events.filter((data) =>{
        return data.id == info.event.id && data.resourceId === this.serviceModal.TypeGaraje;
      })[0].start,
      Name: info.event._def.title,
      Observations: info.event.extendedProps.observacion,
      Phone: info.event.extendedProps.phone,
      Portal: events.filter((data) =>{
        return data.id == info.event.id && data.resourceId === this.serviceModal.TypePortal;
      })[0].start,
      Tiro: events.filter((data) =>{
        return data.id == info.event.id && data.resourceId === this.serviceModal.TypeTiro;
      })[0].start,
      id: info.event.id
    };
  }

  public placeInfoG(place: string, events: any, oldInfo: any) {
    if(place === this.serviceModal.TypeGaraje) {
      return oldInfo.event.start;
    } else {
      return events.filter((data) =>{
        return data.id == oldInfo.event.id && data.resourceId === this.serviceModal.TypeGaraje
      })[0].start
    }
  }
  public placeInfoT(place: string, events: any, oldInfo: any) {
    if(place === this.serviceModal.TypeTiro) {
      return oldInfo.event.start;
    } else {
      return events.filter((data) => {
        return data.id == oldInfo.event.id && data.resourceId === this.serviceModal.TypeTiro
      })[0].start
    }
  }
  public placeInfoP(place: string, events: any, oldInfo: any) {
    if(place === this.serviceModal.TypePortal) {
      return oldInfo.event.start;
    } else {
      return events.filter((data) => {
        return data.id == oldInfo.event.id && data.resourceId === this.serviceModal.TypePortal
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

  serviceClientUpdate(){
    this.tableDataBaseClient.getRepoClients().subscribe(
      (element) => {
        const dataSources = Array.from( {length: 1 } , () => element);
        this.dataClient = new MatTableDataSource(dataSources[0]);
        this.tableDataBaseClient.newCoordinateClientForm.next(this.dataClient);
      });

  }

  public inicialize(calendar , calendarEl: any , events:any, buttonDataBase: ButtonsNavigationComponent) {
    let draggableEl = document.getElementById('mydraggable');
    calendar = new Calendar(calendarEl, {
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      plugins: [dayGridPlugin, listPlugin, timeGridPlugin, resourceTimelinePlugin, resourceDayGridPlugin, interactionPlugin, dayGrid],
      eventClick: (info) => {
        buttonDataBase.openForm(this.infoClick(events,info), this.serviceModal.modalClient, undefined);

      },
      eventDrop: (oldInfo) => {
        switch (oldInfo.event._def.resourceIds[0]) {
          case this.serviceModal.TypePortal:
          {
            buttonDataBase.openForm( this.infoDrag(events, oldInfo, this.serviceModal.TypePortal),  this.serviceModal.modalClient , oldInfo);
          }
            break;
          case this.serviceModal.TypeTiro:
          {

            buttonDataBase.openForm( this.infoDrag(events, oldInfo, this.serviceModal.TypeTiro),  this.serviceModal.modalClient, oldInfo);
          }
            break;
          case this.serviceModal.TypeGaraje:
          {
            buttonDataBase.openForm( this.infoDrag(events, oldInfo, this.serviceModal.TypeGaraje),  this.serviceModal.modalClient, oldInfo);
          }
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
        {id: this.serviceModal.TypeTiro, title: 'Tiro', eventColor: 'red'},
        {id: this.serviceModal.TypePortal, title: 'Portal', eventColor: 'green'},
        {id: this.serviceModal.TypeGaraje, title: 'Garaje', eventColor: 'yellow'},
      ],

      events: events
    });

    calendar.render();

  }
}


