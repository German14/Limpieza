import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {merge, of as observableOf, ReplaySubject} from 'rxjs';
import {catchError, debounceTime, map, startWith, switchMap} from 'rxjs/operators';
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

  private newCoordinate = new ReplaySubject<any>();
  private newCoordinate$ = this.newCoordinate.asObservable();


  user: any;
  datas: any;

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

    this.datas = this.tableDataBase.getRepoIssues();
    const dataSources = Array.from( {length: 10 } , (_, k) => this.datas);
    this.data = new MatTableDataSource(dataSources);
    this.data.sort = this.sort;
    this.data.paginator = this.paginator;
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
    dialogRef.afterClosed().subscribe(result => {
      this.newCoordinate.next(this.data);
    });
  }

  deleteRow(row) {
    this.tableDataBase.DeleteRepoIssues(row);
    this.newCoordinate.next(this.data);
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
    this.authorization.logout()
    this.router.navigate(['/login']);
  }

}

