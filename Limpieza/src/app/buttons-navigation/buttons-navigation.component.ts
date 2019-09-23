import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataService, GithubIssue} from '../service/service';
import {AuthenticationService} from '../_service/AuthentificationService';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormComponent} from '../form/form.component';
import {ServiceDialog} from '../service/serviceDialog';
import {FormClientsComponent} from "../form-clients/form-clients.component";
import {DataServiceClients} from "../service/serviceClients";
import {isNullOrUndefined} from "util";


@Component({
  selector: 'buttonNavigation',
  templateUrl: './buttons-navigation.component.html',
  styleUrls: ['./buttons-navigation.component.scss']
})
export class ButtonsNavigationComponent implements OnInit {
  @Input() public input: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  data: MatTableDataSource<GithubIssue>;

  constructor(
              private tableDataBase: DataService,
              private tableClientDataBase: DataServiceClients,
              private dialog: MatDialog,
              private authorization: AuthenticationService,
              private router: Router,
              private ServiceDialog: ServiceDialog,

  ) { }

  ngOnInit() {
    this.tableDataBase.getRepoIssues().subscribe(
      (element) => {
        const dataSources = Array.from( {length: 1 } , () => element);
        this.data = new MatTableDataSource(dataSources[0]);
        this.data.sort = this.sort;
        this.data.paginator = this.paginator;

        this.tableDataBase.newCoordinateForm.next(this.data);
      });

    this.tableClientDataBase.getRepoClients().subscribe(
      (element) => {
        const dataSources = Array.from( {length: 1 } , () => element);
        this.data = new MatTableDataSource(dataSources[0]);
        this.data.sort = this.sort;
        this.data.paginator = this.paginator;

        this.tableClientDataBase.newCoordinateClientForm.next(this.data);
      });
  }

  openForm(row, extra){
    if(isNullOrUndefined(extra)){
      if( this.input==='FormComponent' ){
        this.input= FormComponent;
      }
      else if( this.input==='FormClientsComponent' ){
        this.input= FormClientsComponent;
      }
    }
    else{
      if(extra === 'FormComponent' ){
        this.input= FormComponent;
      }
      else if(extra ==='FormClientsComponent' ){
        this.input= FormClientsComponent;
      }

    }

    this.ServiceDialog.open(this.input,row);
  }

  exportAsXLSX() {
    this.ServiceDialog.exportAsExcelFile(this.data.data, 'Trabajadoras');
  }

  logout() {
    this.authorization.logout();
    this.router.navigateByUrl('/login');
  }

}
