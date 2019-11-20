import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {AuthenticationService} from '../../_service/AuthentificationService';
import {ServiceSidenav} from "../../service/serviceSidenav";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit,OnDestroy {
  mobileQuery: MediaQueryList;
  user: any;
  lastname: any;


  private mobileQueryListener: () => void;

  constructor(media: MediaMatcher, changeDetectorRef: ChangeDetectorRef,
              private authorization: AuthenticationService,
              private serviceSidenav: ServiceSidenav,
              private route: ActivatedRoute
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }


  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.user = params.get('username');
      this.lastname= params.get('lastname');
    })
  }

}
