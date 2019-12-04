import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {DataServiceClients} from '../service/serviceClients';
import {AuthenticationService} from '../_service/AuthentificationService';
import * as jwt_decode from 'jwt-decode';
import {ServiceRegister} from '../service/serviceRegister';

@Component({
  selector: 'app-configure-user',
  templateUrl: './configure-user.component.html',
  styleUrls: ['./configure-user.component.scss']
})
export class ConfigureUserComponent implements OnInit {

  contactos: FormGroup;
  submitted = false;
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
    this.service.getRepoRegister(decoded.payload.email).subscribe((users) =>{
      this.contactos.patchValue(
        {
          id: users[0].id,
          Name: users[0].name,
          Apellido: users[0].avatar,
          Email: users[0].email,
          password: users[0].password
        });
    });
  }

  get f() { return this.contactos.controls; }


  onSubmit() {
    this.submitted = true;
    if (this.contactos.invalid) {
      return;
    }

    const register = {
      id:this.contactos.value.id,
      name: this.contactos.value.Name,
      avatar: this.contactos.value.Apellido,
      email: this.contactos.value.Email,
      password: this.contactos.value.password,
      enable: true
    };
    this.service.updateUser(register);

  }

}
