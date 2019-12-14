import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {AuthenticationService} from '../_service/AuthentificationService';
import * as jwt_decode from 'jwt-decode';
import {ServiceRegister} from '../service/serviceRegister';
import * as sha1 from 'js-sha1';

@Component({
  selector: 'app-configure-user',
  templateUrl: './configure-user.component.html',
  styleUrls: ['./configure-user.component.scss']
})
export class ConfigureUserComponent implements OnInit {

  contactos: FormGroup;
  submitted = false;
  password = '';

  constructor(private formBuilder: FormBuilder,
              private service: ServiceRegister,
              public dialog: MatDialog,
              private authentification: AuthenticationService) {}
  ngOnInit() {
    this.contactos = this.formBuilder.group({
      id: ['', []],
      Name: ['', [Validators.required]],
      Apellido: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    const currentUser = this.authentification.currentUserValue;
    const decoded = jwt_decode(currentUser);
    this.service.getRepoRegister(decoded.payload.email).subscribe((users) => {

      this.contactos.patchValue(
        {
          id: users[0].id,
          Name: users[0].name,
          Apellido: users[0].avatar,
          Email: users[0].email,
          password: users[0].password,
        });
    });
  }

  get f() { return this.contactos.controls; }


  onSubmit() {
    this.submitted = true;
    if (this.contactos.invalid) {
      return;
    }

    if (this.contactos.value.password.length !== 40) {
      sha1(this.contactos.value.password);
      const hash = sha1.create();
      hash.update(sha1(this.contactos.value.password));
      this.password = hash.hex();
    } else {
      this.password = this.contactos.value.password;
    }
    const register = {
      id: this.contactos.value.id,
      name: this.contactos.value.Name,
      avatar: this.contactos.value.Apellido,
      email: this.contactos.value.Email,
      password: this.password,
      enable: true
    };
    this.service.updateUser(register);
  }

}
