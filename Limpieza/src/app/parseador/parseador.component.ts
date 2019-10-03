import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DataService} from '../service/service';
import {FormBuilder} from '@angular/forms';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-parseador',
  templateUrl: './parseador.component.html',
  styleUrls: ['./parseador.component.scss']
})
export class ParseadorComponent implements OnInit {
  loading = false;
  response;

  contentEllipsex1: number[] = [];
  contentEllipsey1: number[] = [] ;
  contentEllipsex2: number[] = [];
  contentEllipsey2: number[] = [];


  contentLinex1: number[] = [];
  contentLiney1: number[] = [] ;
  contentLinex2: number[] = [];
  contentLiney2: number[] = [];

  contentEllipse: string[] = [];
  contentLine: string[] = [];
  contentPolyLine: string[] = [];
  contentArc: string[] = [];

<<<<<<< HEAD

   polyLineX: number[] = [];
   polyLineY: number[] = [];
  polyLine: number[] = [];
  count: number[] = [];
  element;
=======
  // polyLineX: number[] = [];
  // polyLineY: number[] = [];
  polyLine: number[] = [];
>>>>>>> Frontend
  formGroup = this.fb.group({
    files: [null, '']
  });

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, private service: DataService) { }

  ngOnInit() {

  }

  onFileChange(event) {
    this.service.readFile(event).subscribe((element) => {
      const separador = JSON.stringify(element).split('// Ilv Version: 3.0\\r\\n// File generated: Wed Feb 20 11:40:36 2008');
      const separador2 = separador[1].split(
        '\\r\\n// Creator class: IlvManagerOutput\\r\\nPalettes 5\\r\\n2 \\"gray\\" \\"blue\\" \\"default\\"' +
        ' \\"StockedDefaultGui\\" 0 solid solid 0 0 0\\r\\n1 \\"gray\\" \\"red\\" \\"default\\" \\"StockedDefaultGui\\"' +
        ' 0 solid solid 0 0 0\\r\\n4 \\"gray\\" \\"gray\\" \\"default\\" \\"StockedDefaultGui\\" 0 solid solid 0 0 0' +
        '\\r\\n\\"default\\" 0 \\"gray\\" \\"black\\" \\"default\\" \\"StockedDefaultGui\\" 0 solid solid 0 0 0\\r\\n3' +
        ' \\"gray\\" \\"cyan\\" \\"default\\" \\"StockedDefaultGui\\" 0 solid solid 0 0 0\\r\\nIlvObjects 18223\\r\\n');
      const separador3 = separador2[1].split('0\\r\\n1');
      for (let i = 0; i <= separador3.length - 1 ; i++) {
        const separador5 = separador3[i].split(' { ' + [i] + ' ' + 1 )[1];
        const separador4 = separador3[i].split(' { ' + [i] + ' ' + 0 )[1];

        if (!isNullOrUndefined(separador4)) {
          if (separador4.indexOf('IlvEllipse') === 1) {
            if (separador4.charAt( separador4.length - 2 ) === '}') {
              const separadorEllipse = separador4.split('IlvEllipse')[1].substring(0, separador4.split('IlvEllipse')[1].length - 2);

              this.contentEllipsex1.push(Math.abs(parseInt(separadorEllipse.split(' ')[1], 16) / 10000));
              this.contentEllipsey1.push(Math.abs(parseInt (separadorEllipse.split(' ')[2], 16) / 10000));
              this.contentEllipsex2.push(Math.abs(parseInt ( separadorEllipse.split(' ')[3], 16) * 10));
              this.contentEllipsey2.push(Math.abs(parseInt ( separadorEllipse.split(' ')[4], 16) * 10 ));
              this.contentEllipse.push(separadorEllipse);

            }

          }  else if (separador4.indexOf('IlvPoly') === 1) {
<<<<<<< HEAD
            if (separador4.charAt(separador4.length - 2) === '}') {
=======
            if (separador4.charAt( separador4.length - 2 ) === '}') {
>>>>>>> Frontend
              const separadorPoly = separador4.split('IlvPolyline')[1].substring(0, separador4.split('IlvPolyline')[1].length - 2);

              const splitString = separadorPoly.split('\\r\\n');

<<<<<<< HEAD
              this.count.push(+splitString[0]);
              console.log(splitString[1])
            //   if (splitString.length > 1) {
            //     // tslint:disable-next-line:prefer-for-of
            //     for (let j = 0; j < splitString[0].length - 1; j++) {
            //       const punto = splitString[j].split(' ');
            //
            //       for (let z = 2; z < punto.length - 1; z++) {
            //
            //         if (+z % 2 !== 0) {
            //           this.polyLineX.push(Math.abs(+punto[z] / 10000));
            //           this.polyLine.push(+punto[z]);
            //         } else {
            //           this.polyLineY.push(Math.abs(+punto[z] / 10000));
            //         }
            //       }
            //     }
            //   }
            //
            // }
            // console.log(this.count[0])
            // for (let s = 0; s < this.count[0] ; s++){
            //   console.log(this.polyLine[s])
             }
=======
              if (splitString.length > 1) {
                // tslint:disable-next-line:prefer-for-of
                  for (let j = 0; j < splitString[0].length - 1; j++) {
                    const punto = splitString[j].split(' ');
                    for (let z = 2; z < punto.length - 1; z++) {
                      if (+z % 2 !== 0) {
                         this.polyLine.push( +z, +punto[z]);
                      } else {
                         this.polyLine.push( +z, +punto[z]);
                      }
                    }

                  }
              }

              this.contentPolyLine.push(separadorPoly);

            }
>>>>>>> Frontend
          }

        } else if (!isNullOrUndefined(separador5)) {
          if (separador5.indexOf('IlvLine') === 1) {
            if (separador5.charAt( separador5.length - 2 ) === '}') {
              const separadorLine = separador5.split('IlvLine')[1].substring(0, separador5.split('IlvLine')[1].length - 2);

<<<<<<< HEAD
              this.contentLinex1.push(Math.abs(parseInt(separadorLine.split(' ')[1], 16) / 100000));
              this.contentLiney1.push(Math.abs(parseInt (separadorLine.split(' ')[2], 16) / 100000));
              this.contentLinex2.push(Math.abs(parseInt ( separadorLine.split(' ')[3], 16) / 10000));
              this.contentLiney2.push(Math.abs(parseInt ( separadorLine.split(' ')[4], 16) / 10000 ));
=======
              this.contentLinex1.push(Math.abs(parseInt(separadorLine.split(' ')[1], 16) / 10000));
              this.contentLiney1.push(Math.abs(parseInt (separadorLine.split(' ')[2], 16) / 10000));
              this.contentLinex2.push(Math.abs(parseInt ( separadorLine.split(' ')[3], 16) / 1000));
              this.contentLiney2.push(Math.abs(parseInt ( separadorLine.split(' ')[4], 16) / 1000 ));
>>>>>>> Frontend
              this.contentLine.push(separadorLine);
            }
          }
        }

      }
    });
  }





}
