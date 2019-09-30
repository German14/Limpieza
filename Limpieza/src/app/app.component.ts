import { Component } from '@angular/core';
import {AuthenticationService} from './_service/AuthentificationService';
import {Router} from '@angular/router';
import {User} from './_model/userModel';
import {isNullOrUndefined} from '@swimlane/ngx-datatable/release/utils/column-helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x =>
    {
      if(!isNullOrUndefined(x)){
        this.currentUser = x
      }
        else{

        this.router.navigate(['/login']);
      }
    });
  }

}
