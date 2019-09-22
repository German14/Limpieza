import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatPaginatorModule} from "@angular/material/paginator"
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {DataService} from "./service/service";
import {
  MatDatepickerModule,
  MatDialog,
  MatDialogModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from "@angular/material";
import {CdkTableModule} from "@angular/cdk/table"
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {FormComponent} from './form/form.component';
import {LoginComponent} from './login/login.component';
import {InterceptorService} from "./_service/Interceptor";
import {AuthenticationService} from "./_service/AuthentificationService";
import {ClientsComponent} from './clients/clients.component';
import {FormClientsComponent} from './form-clients/form-clients.component';
import {DataServiceClients} from "./service/serviceClients";
import {DatepickerComponent} from './datepicker/datepicker.component';
import {CalendarModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {NotificationsComponent} from './notifications/notifications.component';
import {NotificationService} from "./service/notificationService";
import {NotifierModule, NotifierOptions} from "angular-notifier";
import {ButtonsNavigationComponent} from './buttons-navigation/buttons-navigation.component';
import {ServiceDialog} from "./service/serviceDialog";
import {TableModule} from "./table/table.module";
import {ButtonNavigationModule} from './buttons-navigation/button-navigation.module';
import {ClientModule} from "./clients/client.module";
import { FileUploadComponent } from './file-upload/file-upload.component';
import {FileUploadModule} from "./file-upload/file-upload.module";
import {NotificationsModule} from "./notifications/notifications.module";

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
  declarations: [
    AppComponent,
    FormComponent,
    LoginComponent,
    FormClientsComponent,
    DatepickerComponent,


  ],
  imports: [
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    NgxDatatableModule,
    BrowserModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    CdkTableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    FormsModule,

    MatDialogModule,
    MatToolbarModule,
    MatDatepickerModule,
    TableModule,
    ClientModule,
    FileUploadModule,
    NotificationsModule,
    ButtonNavigationModule,
    MatNativeDateModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [DataService,
    DataServiceClients,
    MatDialog,
    AuthenticationService,
    NotificationService,
    ButtonsNavigationComponent,
    ServiceDialog,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},

  ],
  bootstrap: [AppComponent],
  exports: [
    ButtonsNavigationComponent
  ],
  entryComponents: [FormComponent,
    FormClientsComponent,
    ButtonsNavigationComponent,
    NotificationsComponent]
})
export class AppModule { }

