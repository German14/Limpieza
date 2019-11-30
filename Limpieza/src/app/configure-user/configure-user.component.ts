import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material";
import {DataServiceClients} from "../service/serviceClients";

@Component({
  selector: 'app-configure-user',
  templateUrl: './configure-user.component.html',
  styleUrls: ['./configure-user.component.scss']
})
export class ConfigureUserComponent implements OnInit {

  contactos: FormGroup;
  submitted = false;
  titulo = 'Agregar / Editar nuevo Cliente';

  constructor(private formBuilder: FormBuilder,
              private service: DataServiceClients,
              public dialog: MatDialog) {}
  ngOnInit() {
    this.contactos = this.formBuilder.group({
      id: ['', []],
      Name: ['', [Validators.required]],
      Apellido: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      password: ['', [Validators.required]],

    });
 
  }

  get f() { return this.contactos.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.contactos.invalid) {
      return;
    }
    this.dialog.closeAll();
  }

}
