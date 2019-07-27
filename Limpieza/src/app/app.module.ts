import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatPaginatorModule} from "@angular/material/paginator"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TableComponent } from './table/table.component';
import {MockServerResultsService} from "./service/service";
import {MatProgressSpinnerModule, MatSortModule, MatTableModule} from "@angular/material";
import {CdkTableModule} from "@angular/cdk/table"
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    TableComponent
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
    BrowserAnimationsModule

  ],
  providers: [MockServerResultsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

