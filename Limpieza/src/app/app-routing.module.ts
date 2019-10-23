import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_service/AuthGuard';
import {DatepickerComponent} from './datepicker/datepicker.component';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {SidenavModule} from './components/sidenav/sidenav.module';
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
  {path: 'sidenav',
    component:SidenavComponent,
    children:[
      {
        path: 'table',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./table/table.module').then(
            m=>m.TableModule
          )
      },
      {
        path: 'client',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./clients/client.module').then(
            m=>m.ClientModule
          )
      },
      {
        path: 'parseador',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./parseador/parseador.module').then(
            m=>m.ParseadorModule
          )
      },
      {
        path: 'fileUpload',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./file-upload/file-upload.module').then(
            m=>m.FileUploadModule
          )
      },
      {
        path: 'logout',
        component: LoginComponent
      },

    ]
  },
  { path: 'date', component: DatepickerComponent , canActivate: [AuthGuard]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes), SidenavModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
