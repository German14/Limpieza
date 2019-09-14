import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DataService, GithubIssue} from '../service/service';
import {AuthenticationService} from '../_service/AuthentificationService';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormComponent} from '../form/form.component';
import {ServiceDialog} from '../service/serviceDialog';
import {FormClientsComponent} from "../form-clients/form-clients.component";


@Component({
  selector: 'buttons-navigation',
  templateUrl: './buttons-navigation.component.html',
  styleUrls: ['./buttons-navigation.component.scss']
})
export class ButtonsNavigationComponent implements OnInit {
  @Input() public input: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  data: MatTableDataSource<GithubIssue>;

  constructor(private tableDataBase: DataService,
              private dialog: MatDialog,
              private authorization: AuthenticationService,
              private router: Router,
              private dialog2: ServiceDialog,

  ) {

  }

  ngOnInit() {
    this.tableDataBase.getRepoIssues().subscribe(
      (element) => {
        const dataSources = Array.from( {length: 1 } , () => element);
        this.data = new MatTableDataSource(dataSources[0]);
        this.data.sort = this.sort;
        this.data.paginator = this.paginator;

        this.tableDataBase.newCoordinateForm.next(this.data);
      });

  }

  openForm(row,Form){

    if(Form==='FormComponent' || this.input==='FormComponent'){

      this.input= FormComponent;
    }
    else {
      this.input= FormClientsComponent;
    }

    this.dialog2.open(this.input,row);
  }
  exportAsXLSX() {
    this.tableDataBase.exportAsExcelFile(this.data.data, 'Trabajadoras');
  }

  logout() {
    this.authorization.logout();
    this.router.navigate(['/login']);
  }

}
