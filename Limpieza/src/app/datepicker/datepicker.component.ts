import {Component, OnInit, ViewChild, TemplateRef, Input, Output, EventEmitter} from '@angular/core';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth, isSameDay,  isSameMonth,  addHours} from 'date-fns';
import { Subject } from 'rxjs';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView} from 'angular-calendar';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {FormComponent} from "../form/form.component";
import {FormClientsComponent} from "../form-clients/form-clients.component";
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/internal/operators/switchMap';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  [x: string]: any;


  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

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
      start: subDays(startOfDay(new Date(parseInt(this.route.snapshot.queryParamMap.get("Year")), parseInt(this.route.snapshot.queryParamMap.get("Month")) ,parseInt(this.route.snapshot.queryParamMap.get("Day")))), 1),
      end: addDays(new Date(2019,8,30), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  activeDayIsOpen: boolean = true;

  constructor(private dialog: MatDialog, private route: ActivatedRoute) {
    this.year = this.route.snapshot.queryParamMap.get("Year");
    this.Month= this.route.snapshot.queryParamMap.get("Month")
    this.day=this.route.snapshot.queryParamMap.get("Day");
    console.log(this.day)

  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams => {
      this.name = queryParams.get("Year")
      console.log(this.name)

    })
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }
  eventTimesChanged({
                      event,
                      newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
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
    let modal: any
    this.modalData = { event, action };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = '';
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
