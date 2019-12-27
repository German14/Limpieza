import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import * as M from 'materialize-css';
import {ServiceServer} from '../_service/serviceServer';


export interface GithubIssue {
  id: number;
  Name: string;
  Phone: string;
  Portal: string;
  Garaje: string;
  Tiro: string;
  Dias: string;
  Observations: string;
}


@Injectable()
export class DataServiceClients {

  /** An Table database that the data source uses to retrieve data for the table. */
  public newCoordinateClientForm = new Subject<any>();
  public newCoordinateClientForm$ =  this.newCoordinateClientForm.asObservable();

  constructor(private httpClient: HttpClient, private serverUri: ServiceServer) {}
  public href;
  public requestUrl;

  getRepoClients(): Observable <any> {
    this.href = this.serverUri.urlLocal + 'clients';
    this.requestUrl = this.href;
    return this.httpClient.get (this.requestUrl);
  }
  getRepoRegister(email: string): Observable <any> {
    this.href = this.serverUri.urlLocal + 'api/configure/' + email;
    this.requestUrl = this.href;
    return this.httpClient.get (this.requestUrl);
  }
  getRepoClient(data): Observable <any> {
    this.href = this.serverUri.urlLocal + 'clients/' + data.id;
    this.requestUrl = this.href;
    return this.httpClient.get (this.requestUrl);
  }
  PostRepoClients(data) {
    this.href = this.serverUri.urlLocal + 'clients';
    this.requestUrl = this.href;
    if (data.id === undefined) {
      return this.httpClient.post (this.requestUrl, data).subscribe((value) => {
        M.toast({html: value['result']}, 3000);
      }, error => {
        M.toast({html: error.error.message}, 3000);
      });
    } else {
      this.href = this.serverUri.urlLocal + 'clients/' + data.id;
      this.requestUrl =this.href;
      return this.httpClient.put (this.requestUrl, data).subscribe((value) => {
        M.toast({html: value['result']}, 3000);
      }, error => {
        M.toast({html: error.error.message}, 3000);
      });
    }
  }

  DeleteRepoClients(data) {
    this.href = this.serverUri + 'clients/' + data.id ;
    this.requestUrl = this.href;
    return this.httpClient.delete (this.requestUrl, data).subscribe((value) => {
      M.toast({html: value['result']}, 3000);
    }, error => {
      M.toast({html: error.error.message}, 3000);
    });
  }


}


