import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TableComponent} from "./table/table.component";
import {FormsModule} from "@angular/forms";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./_service/AuthGuard";
import {ClientsComponent} from './clients/clients.component';
import {DatepickerComponent} from "./datepicker/datepicker.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'table', component: TableComponent},
  { path: 'clients', component: ClientsComponent },
  { path: 'date', component: DatepickerComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
