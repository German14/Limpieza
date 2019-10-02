import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import * as fileReader from 'filereader';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../service/service';
import {FormBuilder} from '@angular/forms';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-parseador',
  templateUrl: './parseador.component.html',
  styleUrls: ['./parseador.component.scss']
})
export class ParseadorComponent implements OnInit {
  loading=false;
  response;

  content: string[] =[];
  formGroup = this.fb.group({
    files: [null, '']
  });

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, private service: DataService) { }

  ngOnInit() {

  }

  onFileChange(event) {
   this.service.readFile(event).subscribe((element) => {
        const separador = JSON.stringify(element).split('// Ilv Version: 3.0\\r\\n// File generated: Wed Feb 20 11:40:36 2008');
        const separador2 = separador[1].split('\\r\\n// Creator class: IlvManagerOutput\\r\\nPalettes 5\\r\\n2 \\"gray\\" \\"blue\\" \\"default\\" \\"StockedDefaultGui\\" 0 solid solid 0 0 0\\r\\n1 \\"gray\\" \\"red\\" \\"default\\" \\"StockedDefaultGui\\" 0 solid solid 0 0 0\\r\\n4 \\"gray\\" \\"gray\\" \\"default\\" \\"StockedDefaultGui\\" 0 solid solid 0 0 0\\r\\n\\"default\\" 0 \\"gray\\" \\"black\\" \\"default\\" \\"StockedDefaultGui\\" 0 solid solid 0 0 0\\r\\n3 \\"gray\\" \\"cyan\\" \\"default\\" \\"StockedDefaultGui\\" 0 solid solid 0 0 0\\r\\nIlvObjects 18223\\r\\n');
        const separador3 = separador2[1].split('0\\r\\n1');
        console.log(separador3.length)
        for(let i=0; i <= separador3.length -1 ; i++){
          this.content.push(separador3[i].split(' { ')[1]);
        }
     });
  }





}
