import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../service/notificationService";
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements  OnInit{

 constructor(private notification: NotificationService){

 }
 ngOnInit(){
   this.notification.showNotification('info','hola')
 }



}
