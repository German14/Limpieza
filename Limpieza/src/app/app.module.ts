import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TableComponent } from './table/table.component';
import {MockServerResultsService} from "./service/service";

@NgModule({
  declarations: [
    AppComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxDatatableModule,
    BrowserModule

  ],
  providers: [MockServerResultsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

