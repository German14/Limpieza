import {Component, OnInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {AuthenticationService} from "../../_service/AuthentificationService";
import * as jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit,OnDestroy {
  mobileQuery: MediaQueryList;
  user: any;
  arrayItems=[{
    id:'0',
    name:'Trabajadoras',
    url:'table',
    enable:true
  },
    {
    id:'1',
    name:'Clientes',
    url:'client',
    enable:false
  }];
  private mobileQueryListener: () => void;

  constructor(media: MediaMatcher, changeDetectorRef: ChangeDetectorRef, private authorization: AuthenticationService,) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  ngOnInit() {
    this.authorization.currentUser.subscribe((data) => {
      this.user = jwt_decode(data).username;
    });
  }

}
