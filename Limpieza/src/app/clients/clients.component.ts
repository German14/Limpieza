import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {merge, of as observableOf, ReplaySubject} from 'rxjs';
import {catchError, debounceTime, map, startWith, switchMap} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig, MatSort} from "@angular/material";
import {DataServiceClients, GithubIssue} from "../service/serviceClients";
import {DataService} from "../service/service";
import {FormClientsComponent} from "../form-clients/form-clients.component";
import {Router} from "@angular/router";
import {AuthenticationService} from "../_service/AuthentificationService";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit , OnDestroy{

  [x: string]: any;

  displayedColumns: string[] = ['id', 'Name', 'Phone','Tiro','Garaje', 'Portal', 'Observations', 'Delete', 'DateRow'];
  TableDatabaseClients: DataServiceClients | null;
  TableDatabaseUser: DataService | null;

  data: GithubIssue[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  private newCoordinate = new ReplaySubject<any>();
  private newCoordinate$ = this.newCoordinate.asObservable();

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  constructor(private _httpClient: HttpClient, private dialog: MatDialog,
              private router: Router,
              private authorization: AuthenticationService) {
    this.filteredData = this.data;
  }


  ngOnInit() {
    this.newCoordinate$.pipe(debounceTime(100)).subscribe( () => this.ngAfterViewInit());
  }

  ngOnDestroy() {
    this.newCoordinate.unsubscribe();

  }

  openFormClient(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = row;
    dialogConfig.width= '500px';
    let dialogRef = this.dialog.open(FormClientsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.newCoordinate.next(this.ngAfterViewInit())
    });
  }

  deleteRow(row) {
    this.TableDatabaseClients.DeleteRepoClients(row);
    this.newCoordinate.next(this.ngAfterViewInit())
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

  ngAfterViewInit() {
    this.TableDatabaseClients = new DataServiceClients(this._httpClient);
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.TableDatabaseClients!.getRepoClients();
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = 3;
          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }

  applyFilter(filterValue: string) {

    filterValue = filterValue.toLocaleLowerCase();
    this.filteredData = this.data.filter((dat: GithubIssue) =>
      dat.Name.toLocaleLowerCase().indexOf(filterValue) !== -1);
    if(filterValue ===''){
      this.newCoordinate.next(this.ngAfterViewInit())
    }
    this.data= this.filteredData;

  }

  exportAsXLSX() {
    this.TableDatabaseUser.exportAsExcelFile(this.data, 'Clientes');
  }

  logout() {
      this.authorization.logout()
      this.router.navigate(['/login']);

  }
}




