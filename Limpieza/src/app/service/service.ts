import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface GithubApi {
  total_count: number;
}

export interface GithubIssue {
  id: number;
  fullName: string;
  birthday: string;
  isActive: boolean;
}


@Injectable()
export class DataService {

/** An example database that the data source uses to retrieve data for the table. */

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

}
