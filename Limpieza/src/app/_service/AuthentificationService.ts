import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {User} from "../_model/userModel";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>('http://localhost:3000/api/login', { username, password })
      .pipe(map(user => {
        if (user.access_token) {
          localStorage.setItem('currentUser', JSON.stringify(user.access_token));
          this.currentUserSubject.next(user.access_token);
        }
        return user;
      }));
  }

  register (data: string[]) {
    return this.http.post<any>('http://localhost:3000/api/register', { data: data })
      .pipe(map(user => {
      console.log( 'register');
        return user;
      }));
  }

  logout() {
// remove user data from local storage for log out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
