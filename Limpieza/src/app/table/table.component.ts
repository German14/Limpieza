import {HttpClient} from "@angular/common/http";
import {AfterContentInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {merge, Observable, of as observableOf, ReplaySubject} from 'rxjs';
import {catchError, debounce, debounceTime, map, startWith, switchMap} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig, MatSort} from "@angular/material";
import {FormComponent} from "../form/form.component";
import {DataService, GithubIssue} from "../service/service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  [x: string]: any;

  displayedColumns: string[] = ['id', 'fullName', 'birthday', 'isActive', 'Delete'];
  exampleDatabase: DataService | null;
  data: GithubIssue[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  private newCoordinate = new ReplaySubject<any>();
  private newCoordinate$ = this.newCoordinate.asObservable();

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  constructor(private _httpClient: HttpClient, private dialog: MatDialog) {}


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
    this.exampleDatabase.DeleteRepoIssues(row);
    this.newCoordinate.next(this.ngAfterViewInit())
  }

  ngAfterViewInit() {
    this.exampleDatabase = new DataService(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues();
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
    this.dataSource = filterValue.trim().toLocaleLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.newCoordinate.next(this.dataSource);
  }
}

