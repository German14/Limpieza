import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import {MatListModule, MatSidenavModule} from "@angular/material";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    RouterModule
  ]
})
export class SidenavModule { }
