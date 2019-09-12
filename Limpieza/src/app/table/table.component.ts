import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {merge, of as observableOf, ReplaySubject} from 'rxjs';
import {catchError, debounceTime, map, startWith, switchMap, take} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {FormComponent} from '../form/form.component';
import {DataService, GithubIssue, UserData} from '../service/service';
import {AuthenticationService} from '../_service/AuthentificationService';
import {ActivatedRoute, Router} from '@angular/router';
import * as jwt_decode from 'jwt-decode';

import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['id', 'Name', 'Phone', 'Portal', 'Dias', 'Observations', 'delete'];
  data: MatTableDataSource<GithubIssue>;
  user: any;

  private newCoordinate = new ReplaySubject<any>();
  private newCoordinate$ = this.newCoordinate.asObservable();

  constructor(private httpClient: HttpClient, private dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              private authorization: AuthenticationService,
              private tableDataBase: DataService) {
  }

  ngOnInit() {
    this.authorization.currentUser.subscribe((data) => {
      this.user = jwt_decode(data).username;
    });

    this.tableDataBase.getRepoIssues().subscribe(
      (element) => {
        const dataSources = Array.from( {length: 1 } , () => element);
        this.data = new MatTableDataSource(dataSources[0]);
        this.data.sort = this.sort;
        this.data.paginator = this.paginator;
      });

    this.newCoordinate$.pipe(debounceTime(100)).subscribe( () => this.data);
  }

  ngOnDestroy() {
    this.newCoordinate.unsubscribe();
  }

  openForm(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = row;
    dialogConfig.width = '500px';
    const dialogRef = this.dialog.open(FormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
    this.ngOnInit();
    });
  }

  deleteRow(row) {
    this.tableDataBase.DeleteRepoIssues(row);
    setTimeout( () => {
      this.newCoordinate.next(this.ngOnInit())
    },500)
  }

  applyFilter(filterValue: string) {
    this.data.filter = filterValue.trim().toLowerCase();

    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }

  exportAsXLSX() {
    this.tableDataBase.exportAsExcelFile(this.data.data, 'Trabajadoras');
  }
  logout() {
    this.authorization.logout();
    this.router.navigate(['/login']);
  }

}

