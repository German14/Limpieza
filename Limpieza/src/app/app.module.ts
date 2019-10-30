import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator'
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {DataService} from './service/service';
import {
  MatDatepickerModule,
  MatDialog,
  MatDialogModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {FormComponent} from './form/form.component';
import {LoginComponent} from './login/login.component';
import {InterceptorService} from './_service/Interceptor';
import {AuthenticationService} from './_service/AuthentificationService';
import {FormClientsComponent} from './form-clients/form-clients.component';
import {DataServiceClients} from './service/serviceClients';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {ButtonsNavigationComponent} from './buttons-navigation/buttons-navigation.component';
import {ServiceDialog} from './service/serviceDialog';
import {TableModule} from './table/table.module';
import {ButtonNavigationModule} from './buttons-navigation/button-navigation.module';
import {ClientModule} from './clients/client.module';
import {FileUploadModule} from './file-upload/file-upload.module';
import {ParseadorModule} from "./parseador/parseador.module";
import {ServiceSidenav} from "./service/serviceSidenav";
import {RegisterModule} from "./register/register.module";
import {DeleteModule} from "./delete/Delete.module";
import {DatepickerModule} from './datepicker/datepicker.module';
import {DatepickerService} from "./datepicker/service/datepickerService";


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    LoginComponent,
    FormClientsComponent
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
    ParseadorModule,
    FileUploadModule,
    ButtonNavigationModule,
    MatNativeDateModule,
    RegisterModule,
    DeleteModule,
    DatepickerModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [DataService,
    DataServiceClients,
    MatDialog,
    AuthenticationService,
    ButtonsNavigationComponent,
    ServiceDialog,
    ServiceSidenav,
    DatepickerService,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},

  ],
  bootstrap: [AppComponent],
  exports: [
    ButtonsNavigationComponent
  ],
  entryComponents: [FormComponent,
    FormClientsComponent,
    ButtonsNavigationComponent
    ]
})
export class AppModule { }

