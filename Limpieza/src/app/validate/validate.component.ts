import { Component, OnInit } from '@angular/core';
import {first} from "rxjs/operators";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from '../_service/AuthentificationService';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss']
})
export class ValidateComponent implements OnInit {

  validateForm: FormGroup;
  loading = false;
  submitted = false;
  email:any;
  constructor(  private formBuilder: FormBuilder,
                private router: Router,
                private authenticationService: AuthenticationService,
                private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.validateForm = this.formBuilder.group({

    });
  }

  // convenience getter for easy access to form fields
  get fval() { return this.validateForm.controls; }


  keyDownFunction(event) {
    if(event.keyCode == 13) {
      this.onSubmit();
    }
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.validateForm.invalid) {
      return;
    }

    this.loading = true;
    this.email = this.activatedRoute.snapshot.paramMap.get('email');
    this.authenticationService.goToValidate(this.email)
      .pipe(first())
      .subscribe(
        data => {

          this.router.navigate(['/login']);
        },
        error => {
          this.loading = false;
        });
  }

}


