import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from './AuthentificationService';
import * as jwt_decode from 'jwt-decode';
import {isNullOrUndefined} from "util";

export const TOKEN_NAME: string = 'jwt_token';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    const decoded = jwt_decode(currentUser);
    if(!isNullOrUndefined(currentUser)) {
      if((decoded.exp)*1000 > Date.now()){
        return true
      }
    }



// not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
