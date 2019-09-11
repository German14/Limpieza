import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatCalendar, MatDialog} from '@angular/material';
import {DataService} from '../service/service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @ViewChild('calendar', {static: true }) calendar: MatCalendar<any>;

  contacto: FormGroup;
  submitted = false;
  titulo = 'Agregar / Editar nuevo Usuario';

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private service: DataService, public dialog: MatDialog) { }


  ngOnInit() {
    this.contacto = this.formBuilder.group({
      id: ['', []],
      Name: ['', [Validators.required]],
      Phone: ['', Validators.required],
      Portal: ['', Validators.required],
      Dias: ['', Validators.required],
      Observations: ['', Validators.required]
    });
    this.contacto.patchValue({id: this.data.id , Name: this.data.Name, Phone: this.data.Phone ,
      Portal: this.data.Portal, Dias: this.data.Dias, Observations: this.data.Observations});
  }

  get f() { return this.contacto.controls; }

  onSubmit() {

    this.submitted = true;

    if (this.contacto.invalid) {
      return;
    }
    this.service.PostRepoIssues(this.contacto.value);
    this.dialog.closeAll();
  }
}
