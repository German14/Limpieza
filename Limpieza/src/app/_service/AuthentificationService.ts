import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {User} from '../_model/userModel';
import * as sha1 from 'js-sha1';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  private currentUserValidateSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public currentUserValidate: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUserValidateSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentUserValidate = this.currentUserValidateSubject.asObservable();
  }
  public href;
  public requestUrl;

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get currentUserValueValidate(): User {
    return this.currentUserValidateSubject.value;
  }
  login(username: string, passwordform: string) {
    sha1(passwordform);
    const hash = sha1.create();
    hash.update(sha1(passwordform));
    const password = hash.hex();
    return this.http.post<any>('http://localhost:3000/api/login', { username, password })
      .pipe(map(user => {
        if (user.access_token && user.enable) {
          localStorage.setItem('currentUser', JSON.stringify(user.access_token));
          this.currentUserSubject.next(user.access_token);
          this.currentUserValidateSubject.next(user);
        } else {
          localStorage.removeItem('currentUser');
          this.currentUserSubject.next(null);
        }
        return user;
      }));
  }

  register(datas: any) {
    sha1(datas.password);
    const hash = sha1.create();
    hash.update(sha1(datas.password));
    const password = hash.hex();
    const data = {
      name: datas.name,
      avatar: datas.avatar,
      email: datas.email,
      password
    };
    return this.http.post<any>('http://localhost:3000/registrar/register', { data })
      .pipe(map(user => {
        return user;
      }));
  }

  goToValidate(email: string) {
    this.href = 'http://localhost:3000/registrar/auth/email/verify/' + email;
    this.requestUrl = this.href;
    return this.http.get (this.requestUrl);
  }
  logout() {
// remove user data from local storage for log out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
