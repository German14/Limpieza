import { Injectable } from "@angular/core";

import {NotifierService} from "angular-notifier";


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private notifier: NotifierService) {
    this.notifier = notifier;
  }

  /**
   * Show a specific notification (with a custom notification ID)
   *
   * @param {string} type    Notification type
   * @param {string} message Notification message
   * @param {string} id      Notification ID
   */
  public showSpecificNotification( type: string, message: string, id: string ): void {
    this.notifier.show( {
      id,
      message,
      type
    } );
  }

  /**
   * Hide a specific notification (by a given notification ID)
   *
   * @param {string} id Notification ID
   */
  public hideSpecificNotification( id: string ): void {
    this.notifier.hide( id );
  }

  /**
   * Show a notification
   *
   * @param {string} type    Notification type
   * @param {string} message Notification message
   */
  public showNotification( type: string, message: string ): void {
    console.log(type)
    console.log(message)
    this.notifier.notify( type, message );
  }

  /**
   * Hide oldest notification
   */
  public hideOldestNotification(): void {
    this.notifier.hideOldest();
  }

}


