import {Injectable} from '@angular/core';
import {Calendar} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import dayGrid from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import resourceDayGridPlugin from '@fullcalendar/resource-daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {ButtonsNavigationComponent} from '../../buttons-navigation/buttons-navigation.component';
import {DataServiceClients} from '../../service/serviceClients';
import {MatTableDataSource} from '@angular/material';
import {GithubIssue} from '../../service/service';
import {ServiceModalsService} from '../../service/interfaces/serviceModals.service';
import {ServiceDatapickerService} from '../../service/interfaces/serviceDatapicker.service';

@Injectable()
export class DatePickerService {
  public buttonDataBase: ButtonsNavigationComponent;
  public dataClient: MatTableDataSource<GithubIssue>;


  constructor( private tableDataBaseClient: DataServiceClients,
               private serviceModal: ServiceModalsService,
               private serviceDatapicker: ServiceDatapickerService) {
  }

  public inicialize(calendar , calendarEl: any , events: any, buttonDataBase: ButtonsNavigationComponent) {
    let draggableEl = document.getElementById('mydraggable');
    calendar = new Calendar(calendarEl, {
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      plugins: [dayGridPlugin, listPlugin, timeGridPlugin, resourceTimelinePlugin, resourceDayGridPlugin, interactionPlugin, dayGrid],
      eventClick: (info) => {
        buttonDataBase.openForm(this.serviceDatapicker.infoClick(events, info), this.serviceModal.modalClient, undefined);
      },
      eventDrop: (oldInfo) => {
        switch (oldInfo.event._def.resourceIds[0]) {
          case this.serviceModal.TypePortal:
          {
            buttonDataBase.openForm( this.serviceDatapicker.infoDrag(events, oldInfo, this.serviceModal.TypePortal),  this.serviceModal.modalClient , oldInfo);
          }
          break;
          case this.serviceModal.TypeTiro:
          {
            buttonDataBase.openForm(this.serviceDatapicker.infoDrag(events, oldInfo, this.serviceModal.TypeTiro),  this.serviceModal.modalClient, oldInfo);
          }
          break;
          case this.serviceModal.TypeGaraje:
          {
            buttonDataBase.openForm( this.serviceDatapicker.infoDrag(events, oldInfo, this.serviceModal.TypeGaraje),  this.serviceModal.modalClient, oldInfo);
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


