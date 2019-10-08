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
  contentArcx1: number[] = [];
  contentArcy1: number[] = [] ;
  contentArcx2: number[] = [];
  contentArcy2: number[] = [];
  contentArcd2: number[] = [];
  contentArcr2: number[] = [];


  // polyLineX: number[] = [];
  // polyLineY: number[] = [];
  count: number[] = [];
  polyLine: string[] = [];
  separador7: number[] = [];
  formGroup = this.fb.group({
    files: [null, '']
  });

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, private service: DataService) { }

  ngOnInit() {

  }

  onFileChange(event) {
    this.service.readFile(event).subscribe((element) => {
      const separador = JSON.stringify(element).split('// Ilv Version: 3.0\\r\\n// File generated: Wed Feb 20 11:40:36 2008');
      const separador2 = separador[1].split( '\\r\\n// Creator class: IlvManagerOutput\\r\\nPalettes 5' +
        '\\r\\n2 \\"gray\\" \\"blue\\" \\"default\\"' +
        ' \\"StockedDefaultGui\\" 0 solid solid 0 0 0\\r\\n1 \\"gray\\" \\"red\\" \\"default\\" \\"StockedDefaultGui\\"' +
        ' 0 solid solid 0 0 0\\r\\n4 \\"gray\\" \\"gray\\" \\"default\\" \\"StockedDefaultGui\\" 0 solid solid 0 0 0' +
        '\\r\\n\\"default\\" 0 \\"gray\\" \\"black\\" \\"default\\" \\"StockedDefaultGui\\" 0 solid solid 0 0 0\\r\\n3' +
        ' \\"gray\\" \\"cyan\\" \\"default\\" \\"StockedDefaultGui\\" 0 solid solid 0 0 0\\r\\nIlvObjects 18223\\r\\n');
      const separador3 = separador2[1].split('0\\r\\n');
      for (let i = 0; i <= separador3.length - 1 ; i++) {
        const separador4 = separador3[i].split('1 {')[1];
        if (!isNullOrUndefined(separador4)) {
          if (separador4.includes('IlvEllipse') === true) {
            if ((separador4.charAt( separador4.length - 2 ) === '}')) {
              const separadorEllipse5 = separador4.substring(0, separador4.length - 2);
              const separadorEllipse6 = separadorEllipse5.split('IlvEllipse')[1];
              const separadorEllipse7 = separadorEllipse6.split(' ');
              this.contentEllipsex1.push((parseInt(separadorEllipse7[1], 16) / 10));
              this.contentEllipsey1.push((parseInt(separadorEllipse7[2], 16) / 10));
              this.contentEllipsex2.push((parseInt(separadorEllipse7[3], 16) / 10));
              this.contentEllipsey2.push((parseInt(separadorEllipse7[4], 16) / 10 ));
              this.contentEllipse.push(separadorEllipse6);
            }
          } else if (separador4.includes('IlvLine') === true) {
            if ((separador4.charAt( separador4.length - 2 ) === '}')) {
              const separadorLine5 = separador4.substring(0, separador4.length - 2);
              const separadorLine6 = separadorLine5.split('IlvLine')[1];
              const separadorLine7 = separadorLine6.split(' ');
              this.contentLinex1.push((parseInt(separadorLine7[1], 16) / 10));
              this.contentLiney1.push((parseInt(separadorLine7[2], 16) / 10));
              this.contentLinex2.push((parseInt(separadorLine7[3], 16) / 10));
              this.contentLiney2.push((parseInt(separadorLine7[4], 16) / 10));
              this.contentLine.push(separadorLine6);
            }

          } else if (separador4.includes('IlvArc') === true) {
            if ((separador4.charAt( separador4.length - 2 ) === '}')) {
              const separadorArc5 = separador4.substring(0, separador4.length - 2);
              const separadorArc6 = separadorArc5.split('IlvArc')[1];
              const separadorArc7 = separadorArc6.split(' ');

              this.contentArcx1.push((parseInt(separadorArc7[1], 16) ));
              this.contentArcy1.push((parseInt(separadorArc7[2], 16) ));
              this.contentArcx2.push((parseInt(separadorArc7[3], 16) ));
              this.contentArcy2.push((parseInt(separadorArc7[4], 16) ));
              this.contentArcd2.push((parseInt(separadorArc7[5], 16) ));
              this.contentArcr2.push((parseInt(separadorArc7[6], 16) ));
              this.contentArc.push(separadorArc6);
            }
          } else if (separador4.includes('IlvPolyline') === true) {
            if ((separador4.charAt( separador4.length - 2 ) === '}')) {
              const separadorPoly5 = separador4.substring(0, separador4.length - 2);

              const separadorPoly6 = separadorPoly5.split('IlvPolyline')[1] ;
              this.separador7.push(parseInt(separadorPoly6.split('\\r\\n')[1], 16));


              this.polyLine.push((separadorPoly6.split('\\r\\n')[1]).slice(0, separadorPoly6.length - 1));
              this.contentPolyLine.push(separadorPoly6);
            }
          }
        }

      }
    });

  }





}
