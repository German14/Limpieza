import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TableComponent} from "./table/table.component";
import {FormsModule} from "@angular/forms";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./_service/AuthGuard";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'table', component: TableComponent},
  { path: 'form', component: FormsModule },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
