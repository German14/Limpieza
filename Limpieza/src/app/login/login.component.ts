import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from "../_service/AuthentificationService";
import {query} from "@angular/animations";
import {ButtonsNavigationComponent} from "../buttons-navigation/buttons-navigation.component";
import {NotificationsComponent} from "../notifications/notifications.component";
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error:string;
  message:string;

  constructor(  private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private authenticationService : AuthenticationService

                ) { }


   ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

// for accessing to form fields
  get fval() { return this.loginForm.controls; }

  keyDownFunction(event) {
    if(event.keyCode == 13) {
      this.onFormSubmit();
    }
  }
  onFormSubmit() {
    console.log('holaaaa')
    this.submitted = true;
    if(this.loginForm.invalid){
      console.log(this.fval.username.value)
      return;
    }
    this.authenticationService.login(this.fval.username.value, this.fval.password.value)
      .subscribe(
        data =>
        {
          this.loading = false;
          this.router.navigateByUrl('/sidenav/table');
          console.log(data);
        },
        error => {
          console.log(error);

          this.loading = true;
            this.message= error.statusText;

          this.error = error['message']
        });
  }
}
