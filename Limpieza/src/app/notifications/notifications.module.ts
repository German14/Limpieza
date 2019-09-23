import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule} from "@angular/material";
import {ButtonNavigationModule} from "../buttons-navigation/button-navigation.module";
import {NotificationsRoutingModule} from "./notifications-routing.module";
import {NotificationsComponent} from "./notifications.component";
import {NotifierModule, NotifierOptions} from 'angular-notifier';
import {FormsModule} from "@angular/forms";
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from '../app.component';
import {LoginComponent} from "../login/login.component";

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};
@NgModule({
  declarations: [NotificationsComponent],
  exports: [
    NotificationsComponent
  ],
  bootstrap: [NotificationsComponent,AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    NotifierModule,
    NotificationsRoutingModule,
    MatCardModule,
    ButtonNavigationModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    NotifierModule.withConfig(customNotifierOptions)
  ]
})
export class NotificationsModule { }
