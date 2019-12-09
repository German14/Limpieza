import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DataService, GithubIssue} from '../service/service';
import {AuthenticationService} from '../_service/AuthentificationService';
import {Router} from '@angular/router';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormComponent} from '../form/form.component';
import {ServiceDialog} from '../service/serviceDialog';
import {FormClientsComponent} from '../form-clients/form-clients.component';
import {DataServiceClients} from '../service/serviceClients';
import {isNullOrUndefined} from 'util';


@Component({
  selector: 'app-button-navigation',
  templateUrl: './buttons-navigation.component.html',
  styleUrls: ['./buttons-navigation.component.scss']
})
export class ButtonsNavigationComponent implements OnInit {
  @Input() public input: any;
  @Input() public export: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  data: MatTableDataSource<GithubIssue>;
  dataClient: MatTableDataSource<GithubIssue>;

  constructor(
    private tableDataBase: DataService,
    private tableClientDataBase: DataServiceClients,
    private dialog: MatDialog,
    private authorization: AuthenticationService,
    private router: Router,
    private serviceDialog: ServiceDialog,

  ) { }

  ngOnInit() {
    if (this.input === 'FormComponent') {
      this.tableDataBase.getRepoIssues().subscribe(
        (element) => {
          const dataSources = Array.from( {length: 1 } , () => element);
          this.data = new MatTableDataSource(dataSources[0]);
          this.data.sort = this.sort;
          this.data.paginator = this.paginator;

          this.tableDataBase.newCoordinateForm.next(this.data);
        });

    } else if (this.input === 'FormClientsComponent') {
      this.tableClientDataBase.getRepoClients().subscribe(
        (element) => {
          const dataSources = Array.from( {length: 1 } , () => element);
          this.dataClient = new MatTableDataSource(dataSources[0]);
          this.dataClient.sort = this.sort;
          this.dataClient.paginator = this.paginator;

          this.tableClientDataBase.newCoordinateClientForm.next(this.dataClient);
        });
    }


  }

  openForm(row, extra?, oldInfo?) {
    if (isNullOrUndefined(extra)) {
      if (this.input === 'FormComponent' ) {
        this.input = FormComponent;
      } else if ( this.input === 'FormClientsComponent' ) {
        this.input = FormClientsComponent;
      }
    } else {
      if (extra === 'FormComponent' ) {
        this.input = FormComponent;
      } else if (extra === 'FormClientsComponent' ) {
        this.input = FormClientsComponent;
      }

    }

    this.serviceDialog.open(this.input, row , oldInfo);
  }

  exportAsXLSX() {
    if (this.export === 'tableComponent') {
      this.serviceDialog.exportAsExcelFile(this.data.data, 'Trabajadores');
    } else {
      this.serviceDialog.exportAsExcelFile(this.dataClient.data, 'Clientes');
    }
  }

  logout() {
    this.authorization.logout();
    this.router.navigateByUrl('/login');
  }

}
