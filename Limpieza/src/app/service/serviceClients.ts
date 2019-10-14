import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import * as M from 'materialize-css'


export interface GithubIssue {
  id: number;
  Name: string;
  Phone: string;
  Portal: string;
  Dias: string;
  Observations: string;
}


@Injectable()
export class DataServiceClients {

  /** An Table database that the data source uses to retrieve data for the table. */
  public newCoordinateClientForm = new Subject<any>();
  public newCoordinateClientForm$=  this.newCoordinateClientForm.asObservable();

  constructor(private _httpClient: HttpClient) {}
  public href;
  public requestUrl;

  getRepoClients(): Observable <any> {
    this.href = 'http://localhost:3000/clients';
    this.requestUrl = this.href;
    return this._httpClient.get (this.requestUrl);
  }
  getRepoClient(data): Observable <any> {
    this.href = 'http://localhost:3000/clients/'+ data.id;
    this.requestUrl = this.href;
    return this._httpClient.get (this.requestUrl);
  }
  PostRepoClients(data) {
    this.href = 'http://localhost:3000/clients';
    this.requestUrl =this.href;
    if(data.id === undefined) {
      return this._httpClient.post (this.requestUrl, data).subscribe((value)=>{
        M.toast({html: value['result']}, 3000);
      }, error =>{
        M.toast({html: error.error.message}, 3000);
      });
    }
    else{
      this.href = 'http://localhost:3000/clients/'+ data.id;
      this.requestUrl =this.href;
      return this._httpClient.put (this.requestUrl, data).subscribe((value)=>{
        M.toast({html: value['result']}, 3000);
      }, error =>{
        M.toast({html: error.error.message}, 3000);
      });
    }
  }

  DeleteRepoClients(data){
    this.href = 'http://localhost:3000/clients/' + data.id ;
    this.requestUrl =this.href;
    return this._httpClient.delete (this.requestUrl, data).subscribe((value)=>{
      M.toast({html: value['result']}, 3000);
    }, error =>{
      M.toast({html: error.error.message}, 3000);
    });
  }


}


