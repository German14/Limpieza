import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../service/notificationService";
@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements  OnInit{

 constructor(private notification: NotificationService){

 }
 ngOnInit(){
   this.notification.showNotification('info','hola')
 }
  showNotification(){

    this.notification.showSpecificNotification('info','hola','1')
  }

}
