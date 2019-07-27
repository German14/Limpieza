import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  contacto: FormGroup;
  submitted = false;
  titulo = 'Crear un Formulario con Angular 7 y Bootstrap 4 + Validación';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.contacto = this.formBuilder.group({
      nya: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      asunto: ['', Validators.required],
      postre: ['', Validators.required],
      mensaje: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.contacto.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.contacto.invalid) {
      return;
    }

    alert('Mensaje Enviado !')
  }
}
