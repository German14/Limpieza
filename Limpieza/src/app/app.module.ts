import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatPaginatorModule} from "@angular/material/paginator"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TableComponent } from './table/table.component';
import {DataService} from "./service/service";
import {
  MatDatepickerModule,
  MatDialog,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from "@angular/material";
import {CdkTableModule} from "@angular/cdk/table"
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { FormsModule }   from '@angular/forms';
import { FormComponent } from './form/form.component';
import { LoginComponent } from './login/login.component';
import {InterceptorService} from "./_service/Interceptor";
import {AuthenticationService} from "./_service/AuthentificationService";
import { ClientsComponent } from './clients/clients.component';
import { FormClientsComponent } from './form-clients/form-clients.component';
import {DataServiceClients} from "./service/serviceClients";
import { DatepickerComponent } from './datepicker/datepicker.component';
import {CalendarModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    FormComponent,
    LoginComponent,
    ClientsComponent,
    FormClientsComponent,
    DatepickerComponent

  ],
  imports: [
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
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [DataService,DataServiceClients, MatDialog,AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }  ],
  bootstrap: [AppComponent],
  entryComponents: [FormComponent,FormClientsComponent]
})
export class AppModule { }

