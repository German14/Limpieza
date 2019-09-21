import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
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
    enable:true,
    icon:'build'
  },
    {
      id:'1',
      name:'Clientes',
      url:'client',
      enable:false,
      icon: 'assignment_ind'
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
  lastItem;
  selected(item){
    if(this.lastItem!==item.name){
      this.arrayItems[1].enable =!this.arrayItems[1].enable;
      this.arrayItems[0].enable =!this.arrayItems[0].enable;
      this.lastItem=item.name;
    }

  }

  ngOnInit() {
    this.authorization.currentUser.subscribe((data) => {
      this.user = jwt_decode(data).username;
    });
  }

}
