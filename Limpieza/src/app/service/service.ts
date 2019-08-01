import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
export interface GithubApi {
  total_count: number;
}

export interface GithubIssue {
  id: number;
  Name: string;
  Phone: string;
  Portal: string;
  Dias: string;
  Observations: string;
}


@Injectable()
export class DataService {

/** An Table database that the data source uses to retrieve data for the table. */

  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(): Observable <any> {
    const href = 'http://localhost:3000/users';
    const requestUrl =href;

    return this._httpClient.get (requestUrl);
  }
  PostRepoIssues(data) {
    const href = 'http://localhost:3000/users';
    const requestUrl =href;
    if(data.id === undefined) {
      return this._httpClient.post (requestUrl, data).subscribe();
    }
    else{
      const href = 'http://localhost:3000/users/'+ data.id;
      const requestUrl =href;
      return this._httpClient.put (requestUrl, data).subscribe();
    }
  }

  DeleteRepoIssues(data){
    const href = 'http://localhost:3000/users/' + data.id ;
    const requestUrl =href;
    return this._httpClient.delete (requestUrl, data).subscribe();
  }
  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}


