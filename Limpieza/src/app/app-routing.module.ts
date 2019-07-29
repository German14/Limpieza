import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TableComponent} from "./table/table.component";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  { path: 'table', component: TableComponent },
  { path: 'form', component: FormsModule },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
