import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {DataServiceClients} from "../service/serviceClients";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-form-clients',
  templateUrl: './form-clients.component.html',
  styleUrls: ['./form-clients.component.scss']
})

export class FormClientsComponent implements OnInit {

  contacto: FormGroup;
  submitted = false;
  titulo = 'Agregar / Editar nuevo Cliente';

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
              private service: DataServiceClients,
              public dialog: MatDialog) {}
  ngOnInit() {
    this.contacto = this.formBuilder.group({
      id: ['', []],
      Name: ['', [Validators.required]],
      Phone: ['', Validators.required],
      Garaje: ['', Validators.required],
      Tiro: ['', Validators.required],
      Portal: ['', Validators.required],
      Observations: ['', Validators.required]
    });
    this.contacto.patchValue({id: this.data.id , Name: this.data.Name, Phone: this.data.Phone,
      Garaje: this.data.Garaje,
      Tiro: this.data.Tiro,
      Portal:this.data.Portal,
      Observations: this.data.Observations});
  }

  get f() { return this.contacto.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.contacto.invalid) {
      return;
    }
    this.service.PostRepoClients(this.contacto.value);
    this.dialog.closeAll();
  }
}
