import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import {MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule} from "@angular/material";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class SidenavModule { }
