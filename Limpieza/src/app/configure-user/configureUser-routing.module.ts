import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConfigureUserComponent} from "./configure-user.component";


const routes: Routes = [{path: '', component: ConfigureUserComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigureUserRoutingModule { }
