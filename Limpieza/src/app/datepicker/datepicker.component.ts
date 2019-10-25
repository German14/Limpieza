import {Component, OnInit} from '@angular/core';
import {addDays, endOfDay, isSameDay, isSameMonth, startOfDay, subDays} from 'date-fns';
import {Subject} from 'rxjs';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {FormClientsComponent} from '../form-clients/form-clients.component';
import {ActivatedRoute} from '@angular/router';
import {DataServiceClients} from '../service/serviceClients';
import {take} from "rxjs/operators";
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#09ad18',
    secondary: '#FAE3E3'
  },
  yellow: {
    primary: '#ada70b',
    secondary: '#FAE3E3'
  },


};

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  yearT='';
  MonthT= '';
  dayT='';
  yearG = '';
  MonthG = '';
  dayG = '' ;
  yearP = '';
  MonthP ='';
  dayP = '';
  id = '';
  name:any ;
  Phone = '';
  observations = '';
  Garaje = '';
  Portal = '';
  Tiro = '';
  
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];
  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(
        startOfDay(
          new Date(
            parseInt(this.route.snapshot.queryParamMap.get("YearT")),
            parseInt(this.route.snapshot.queryParamMap.get("MonthT")),
            parseInt(this.route.snapshot.queryParamMap.get("DayT")))),
        0),
      end: addDays(
        endOfDay(
          new Date(
            parseInt(this.route.snapshot.queryParamMap.get("YearT")),
            parseInt(this.route.snapshot.queryParamMap.get("MonthT")),
            parseInt(this.route.snapshot.queryParamMap.get("DayT")))),
        0),
      title: 'Tiro',
      color: colors.blue,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: false,
        afterEnd: false
      },
      draggable: true
    },
    {
      start: subDays(
        startOfDay(
          new Date(
            parseInt(this.yearP),
            parseInt(this.MonthP),
            parseInt(this.dayP))),
        0),
      end: addDays(
        endOfDay(
          new Date(
            parseInt(this.yearP),
            parseInt(this.MonthP),
            parseInt(this.dayP))),
        0),
      title: 'Portal',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: false,
        afterEnd: false
      },
      draggable: true
    },
    {
      start: subDays(
        startOfDay(
          new Date(
            parseInt(this.route.snapshot.queryParamMap.get("YearG")),
            parseInt(this.route.snapshot.queryParamMap.get("MonthG")),
            parseInt(this.route.snapshot.queryParamMap.get("DayG")))),
        0),
      end: addDays(
        endOfDay(
          new Date(
            parseInt(this.route.snapshot.queryParamMap.get("YearG")),
            parseInt(this.route.snapshot.queryParamMap.get("MonthG")),
            parseInt(this.route.snapshot.queryParamMap.get("DayG")))),
        1),
      title: 'Garaje',
      color: colors.yellow,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: false,
        afterEnd: false
      },
      draggable: true
    }
  ];

  activeDayIsOpen: boolean = true;

  constructor(private dialog: MatDialog, private route: ActivatedRoute, private service: DataServiceClients) {
   this.id = this.route.snapshot.queryParamMap.get("id");
    this.service.newCoordinateClientForm$.pipe(take(1)).subscribe((value) => {
      this.yearP = value[0][0].Portal.split('-')[0];
      this.MonthP = value[0][0].Portal.split('-')[1];
      this.dayP = value[0][0].Portal.split('-')[2].split('T')[0];
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0);
      this.viewDate = date;
    }
  }
  eventTimesChanged({event,newStart,newEnd}: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {id:this.route.snapshot.queryParamMap.get("id"),Name:this.name,Phone:this.Phone,
      Observations: this.observations ,Tiro: this.Tiro, Portal:this.Portal, Garaje: this.Garaje};
    this.dialog.open(FormClientsComponent, dialogConfig);

  }


  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date(this.name, 9,8)),
        end: endOfDay(new Date(2019,9,18)),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
