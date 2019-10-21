import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable,
  Injector, OnInit,
  Type, ViewChild,
} from '@angular/core'

import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DataService, GithubIssue} from './service';
import {FormComponent} from '../form/form.component';
import {FormClientsComponent} from '../form-clients/form-clients.component';
import {DataServiceClients} from './serviceClients';

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})

export class ServiceDialog implements OnInit{
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  data: MatTableDataSource<GithubIssue>;
  dataClient: MatTableDataSource<GithubIssue>;
  constructor( private componentFactoryResolver: ComponentFactoryResolver,
               private appRef: ApplicationRef,
               private injector: Injector,
               private dialog: MatDialog,
               private tableDataBase: DataService,
               private tableDataBaseClient: DataServiceClients){



  }

ngOnInit(){
  this.tableDataBase.getRepoIssues().subscribe(
    (element) => {
      const dataSources = Array.from( {length: 1 } , () => element);
      this.data = new MatTableDataSource(dataSources[0]);
      this.data.sort = this.sort;
      this.data.paginator = this.paginator;

      this.tableDataBase.newCoordinateForm.next(this.data);
    });
}

serviceClientUpdate(){
  this.tableDataBaseClient.getRepoClients().subscribe(
    (element) => {
      const dataSources = Array.from( {length: 1 } , () => element);
      this.dataClient = new MatTableDataSource(dataSources[0]);
      this.dataClient.sort = this.sort;
      this.dataClient.paginator = this.paginator;
      this.tableDataBaseClient.newCoordinateClientForm.next(this.dataClient);
    });

}
  public open(componentType: Type<any>, row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = row;
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    if (componentType === FormComponent) {
      const dialogRef = this.dialog.open(componentType, dialogConfig);
      dialogRef.afterClosed().subscribe(() => {
        if (dialogRef['_result'] === undefined) {
          this.ngOnInit();
        }
      })
    }
    else if (componentType === FormClientsComponent) {
      const dialogRef = this.dialog.open(componentType, dialogConfig);
      dialogRef.afterClosed().subscribe(() => {
        if (dialogRef['_result'] === undefined) {
          this.serviceClientUpdate();
        }
      })
    }
  }


  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}


