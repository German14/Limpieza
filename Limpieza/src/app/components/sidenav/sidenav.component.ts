import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {AuthenticationService} from '../../_service/AuthentificationService';
import * as jwt_decode from 'jwt-decode';
import {ServiceSidenav} from "../../service/serviceSidenav";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit,OnDestroy {
  mobileQuery: MediaQueryList;
  user: any;


  private mobileQueryListener: () => void;

  constructor(media: MediaMatcher, changeDetectorRef: ChangeDetectorRef, private authorization: AuthenticationService,private serviceSidenav: ServiceSidenav) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
  lastItem;
  selected(item){
    if(this.lastItem!==item.name){
      console.log(item)
      this.serviceSidenav.arrayItems[0].enable =!this.serviceSidenav.arrayItems[0].enable;
      this.serviceSidenav.arrayItems[1].enable =!this.serviceSidenav.arrayItems[1].enable;
      this.serviceSidenav.arrayItems[2].enable =!this.serviceSidenav.arrayItems[2].enable;
      this.lastItem=item.name;
    }

  }

  ngOnInit() {
    this.authorization.currentUser.subscribe((data) => {
      this.user = jwt_decode(data).username;
    });
  }

}
