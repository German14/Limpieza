import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from '@angular/material';
import {DataService} from '../service/service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  contacto: FormGroup;
  submitted = false;
  titulo = 'Crear un Formulario con Angular 7 y Bootstrap 4 + Validación';

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private service: DataService) { }

  ngOnInit() {
    this.contacto = this.formBuilder.group({
      id: ['',[]],
      fullName: ['', [Validators.required]],
      birthday: ['', Validators.required],
      isActive: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.contacto.patchValue({id: this.data.id ,fullName: this.data.fullName, birthday: this.data.birthday , isActive: this.data.isActive});
  }

  get f() { return this.contacto.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.contacto.invalid) {
      return;
    }
    this.service.PostRepoIssues(this.contacto.value);
  }

  onClose(){
  }
}
