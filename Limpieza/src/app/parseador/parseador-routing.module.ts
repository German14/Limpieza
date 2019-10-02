import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ParseadorComponent} from "./parseador.component";


const routes: Routes = [{path: '', component: ParseadorComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParseadorRoutingModule { }
