import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import * as M from 'materialize-css';
import {ServiceServer} from '../_service/serviceServer';


@Injectable()
export class ServiceRegister {

  /** An Table database that the data source uses to retrieve data for the table. */
  public newCoordinateClientForm = new Subject<any>();
  public newCoordinateClientForm$ =  this.newCoordinateClientForm.asObservable();

  constructor(private httpClient: HttpClient, private serverUri: ServiceServer) {}
  public href;
  public requestUrl;


  getRepoRegister(email: string): Observable <any> {
    this.href = this.serverUri.urlLocal + 'registrar/configure/' + email;
    this.requestUrl = this.href;
    return this.httpClient.get (this.requestUrl);
  }


  updateUser(data) {
    this.href = this.serverUri.urlLocal + 'registrar/configure/' + data.id;
    this.requestUrl = this.href;
    this.httpClient.put (this.requestUrl, data).subscribe((value) => {
      M.toast({html: value['result']}, 3000);
    }, error => {
      M.toast({html: error.error.message}, 3000);
    });
  }
}


