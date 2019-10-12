import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material';
import {DataServiceClients, GithubIssue} from '../service/serviceClients';
import {DataService} from '../service/service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../_service/AuthentificationService';


import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ButtonsNavigationComponent} from '../buttons-navigation/buttons-navigation.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['id', 'Name', 'Phone','Tiro','Garaje', 'Portal', 'Observations', 'Delete', 'DateRow'];
  dataClient: MatTableDataSource<GithubIssue>;



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

    this.tableDataBaseClient.newCoordinateClientForm$.subscribe((value =>{
      const dataSources = Array.from( {length: 1 } , () => value.data);
      this.dataClient = new MatTableDataSource(dataSources[0]);
      this.dataClient.sort = this.sort;
      this.dataClient.paginator = this.paginator;
    }))
  }

  deleteRow(row) {
    this.tableDataBaseClient.DeleteRepoClients(row);
    setTimeout( () => {
      this.tableDataBaseClient.getRepoClients().subscribe(
        (element) => {
          const dataSources = Array.from( {length: 1 } , () => element);
          this.dataClient = new MatTableDataSource(dataSources[0]);
          this.dataClient.sort = this.sort;
          this.dataClient.paginator = this.paginator;
        });
    },500)
  }

  applyFilter(filterValue: string) {
    this.dataClient.filter = filterValue.trim().toLowerCase();

    if (this.dataClient.paginator) {
      this.dataClient.paginator.firstPage();
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




