import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import * as M from 'materialize-css';



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
  public newCoordinateForm = new Subject<any>();
  public newCoordinateForm$ =  this.newCoordinateForm.asObservable();


  constructor(private httpClient: HttpClient) {}
  public href;
  public requestUrl;
  public data;

  getRepoIssues(): Observable<any> {
    this.href = 'http://localhost:3000/users';
    this.requestUrl = this.href;
    return this.httpClient.get (this.requestUrl);
  }


  PostRepoIssues(data) {
    this.href = 'http://localhost:3000/users';
    this.requestUrl = this.href;
    if (data.id === undefined) {
      return this.httpClient.post (this.requestUrl, data).subscribe((value) => {

        M.toast({html: value['result']}, 3000);
      }, error => {
        M.toast({html: error.error.message}, 3000);
      });
    } else {
      this.href = 'http://localhost:3000/users/' + data.id;
      this.requestUrl = this.href;
      this.httpClient.put (this.requestUrl, data).subscribe((value) => {

        M.toast({html: value['result']}, 3000);
      }, error => {
        M.toast({html: error.error.message}, 3000);
      });
    }
  }

  DeleteRepoIssues(data) {
    this.href = 'http://localhost:3000/users/' + data.id ;
    this.requestUrl = this.href;
    return this.httpClient.delete (this.requestUrl, data).subscribe((value) => {
      M.toast({html: value['result']}, 3000);
    }, error => {
      M.toast({html: error.error.message}, 3000);
    });
  }



  readFile(event): Observable <any> {
    return new Observable(obs => {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length) {
        const file = event.target.files[0];
        if (!file) {
          return;
        }
        // tslint:disable-next-line:only-arrow-functions
        reader.onloadend = function(e) {
          const contents = e.target['result'];
          obs.next(contents);
        };
        reader.readAsText(file);
      }
    });
  }

  //
  // sendFile(file): Observable <any> {
  //   return new Observable(obs => {
  //     // console.log('test-file ', file);
  //     const apiUrl = 'http://localhost:3000/api/upload';
  //     const data = new FormData();
  //     console.log(file);
  //     data.append('file', file);
  //     const request = new XMLHttpRequest();
  //     request.open('POST', apiUrl, true);
  //     request.setRequestHeader('Access-Control-Allow-Origin', '*');
  //     request.send(data);
  //     request.onload = (e) => {
  //       if (request.readyState === 4) {
  //         if (request.status === 200) {
  //           obs.next(request.response);
  //         }
  //       } else {
  //         obs.next('nada');
  //
  //       }
  //     };
  //
  //   });
  // }

}


