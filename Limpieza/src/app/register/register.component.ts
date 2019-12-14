import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../_service/AuthentificationService';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import * as M from 'materialize-css';
import * as sha1 from 'js-sha1';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(  private formBuilder: FormBuilder,
                private router: Router,
                private authenticationService: AuthenticationService
              ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/register']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        avatar: ['', []],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]]
      });
  }

  // convenience getter for easy access to form fields
  get fval() { return this.registerForm.controls; }


  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.onSubmit();
    }
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    this.authenticationService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if (!data.value) {
            this.loading = true;
            M.toast({html: data.result}, 5000);
          } else {
            this.loading = false;
            this.router.navigate(['/login']);
            M.toast({html: 'Registrado'}, 5000);
          }
        },
        error => {
          this.loading = false;
        });
  }

}
