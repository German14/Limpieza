import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {merge, of as observableOf, ReplaySubject} from 'rxjs';
import {catchError, debounceTime, map, startWith, switchMap} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {DataServiceClients, GithubIssue} from "../service/serviceClients";
import {DataService} from "../service/service";
import {FormClientsComponent} from "../form-clients/form-clients.component";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../_service/AuthentificationService";
import {FormComponent} from "../form/form.component";

import * as jwt_decode from 'jwt-decode';

import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ButtonsNavigationComponent} from "../buttons-navigation/buttons-navigation.component";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['id', 'Name', 'Phone','Tiro','Garaje', 'Portal', 'Observations', 'Delete', 'DateRow'];
  data: MatTableDataSource<GithubIssue>;
  user: any;


  constructor(private httpClient: HttpClient, private dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              private authorization: AuthenticationService,
              private tableDataBase: DataService,
              private tableDataBaseClient: DataServiceClients,
              private buttonDataBase: ButtonsNavigationComponent
              ) {
  }


  ngOnInit() {
    this.authorization.currentUser.subscribe((data) => {
      this.user = jwt_decode(data).username;
    });

    this.tableDataBaseClient.newCoordinateClientForm$.subscribe((value =>{
      const dataSources = Array.from( {length: 1 } , () => value.data);
      this.data = new MatTableDataSource(dataSources[0]);
      this.data.sort = this.sort;
      this.data.paginator = this.paginator;
    }))
  }

  deleteRow(row) {
    this.tableDataBaseClient.DeleteRepoClients(row);
     setTimeout( () => {
        this.tableDataBaseClient.getRepoClients().subscribe(
          (element) => {
            const dataSources = Array.from( {length: 1 } , () => element);
            this.data = new MatTableDataSource(dataSources[0]);
            this.data.sort = this.sort;
            this.data.paginator = this.paginator;
          });
      },500)
  }

  applyFilter(filterValue: string) {
    this.data.filter = filterValue.trim().toLowerCase();

    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }

  dateRow(row){
    this.router.navigate(['/date'], { queryParams: {
        id: row.id,
        YearT: new Date(row.Tiro).getFullYear(),
        MonthT: new Date(row.Tiro).getMonth(),
        DayT: new Date(row.Tiro).getDate(),

        YearG: new Date(row.Garaje).getFullYear(),
        MonthG: new Date(row.Garaje).getMonth(),
        DayG: new Date(row.Garaje).getDate(),

        YearP: new Date(row.Portal).getFullYear(),
        MonthP: new Date(row.Portal).getMonth(),
        DayP: new Date(row.Portal).getDate()

    }});
  }

}




