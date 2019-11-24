import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../_service/AuthentificationService';
import * as M from 'materialize-css'

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
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.authenticationService.login(this.fval.username.value, this.fval.password.value)
      .subscribe(
        data =>
        {
          this.loading = false;
          if(data.enable === true){
            this.router.navigate(['/sidenav/table'], {queryParams:{
                username: data.name,
                lastname: data.avatar
              }});
          }
          else {
            this.router.navigate(['/login']);
          }

          
        },
        error => {
          console.log(error);

          this.loading = true;
          this.message= error.statusText;
          this.error = error['message'];
          M.toast({html: this.message}, 5000);

        });
  }
}
