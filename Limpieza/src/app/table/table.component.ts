import {HttpClient} from "@angular/common/http";
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {merge, of as observableOf, ReplaySubject} from 'rxjs';
import {catchError, debounceTime, map, startWith, switchMap} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig, MatSort} from "@angular/material";
import {FormComponent} from "../form/form.component";
import {DataService, GithubIssue} from "../service/service";
import {AuthenticationService} from "../_service/AuthentificationService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  [x: string]: any;

  displayedColumns: string[] = ['id', 'Name', 'Phone', 'Portal', 'Dias', 'Observations', 'Delete'];
  TableDatabase: DataService | null;
  data: GithubIssue[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  private newCoordinate = new ReplaySubject<any>();
  private newCoordinate$ = this.newCoordinate.asObservable();

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
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

  openForm(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = row;
    dialogConfig.width= '500px';
    let dialogRef = this.dialog.open(FormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.newCoordinate.next(this.ngAfterViewInit())
    });
  }

  deleteRow(row) {
    this.TableDatabase.DeleteRepoIssues(row);
    this.newCoordinate.next(this.ngAfterViewInit())
  }

  ngAfterViewInit() {
    this.TableDatabase = new DataService(this._httpClient);
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.TableDatabase!.getRepoIssues();
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
    this.TableDatabase.exportAsExcelFile(this.data, 'Trabajadoras');
  }

  logout(){
    this.authorization.logout()
    this.router.navigate(['/login']);
  }

}

