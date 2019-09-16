import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule, MatSidenavModule} from "@angular/material";
import {RouterModule} from "@angular/router";
import {ButtonsNavigationComponent} from "./buttons-navigation.component";
import {TableModule} from "../table/table.module";
import {TableComponent} from "../table/table.component";



@NgModule({
  declarations: [ButtonsNavigationComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
  ],
  exports:[ButtonsNavigationComponent]
})
export class ButtonNavigationModule { }
