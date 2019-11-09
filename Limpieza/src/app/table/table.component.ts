import {HttpClient} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DataService, GithubIssue} from '../service/service';
import {AuthenticationService} from '../_service/AuthentificationService';
import {ActivatedRoute, Router} from '@angular/router';
import * as jwt_decode from 'jwt-decode';

import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ButtonsNavigationComponent} from '../buttons-navigation/buttons-navigation.component';
import {ServiceDialog} from "../service/serviceDialog";
import {DeleteComponent} from "../delete/delete.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['id', 'Name', 'Phone', 'Portal', 'Dias', 'Observations', 'delete'];
  data: MatTableDataSource<GithubIssue>;



  constructor(private httpClient: HttpClient,
              private dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              private authorization: AuthenticationService,
              private tableDataBase: DataService,
              private buttonDataBase: ButtonsNavigationComponent,
              private ServiceDialog: ServiceDialog,

  ) {}

  ngOnInit() {

    this.tableDataBase.newCoordinateForm$.subscribe((value =>{
      const dataSources = Array.from( {length: 1 } , () => value.data);
      this.data = new MatTableDataSource(dataSources[0]);
      this.data.sort = this.sort;
      this.data.paginator = this.paginator;
    }))
  }


  deleteRow(row, table) {
    this.ServiceDialog.open(DeleteComponent, row,undefined);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {row: row, table:table};
    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(DeleteComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((value) => {
      if (dialogRef['_result'] === undefined) {
        this.tableDataBase.getRepoIssues().subscribe(
          (element) => {
            const dataSources = Array.from( {length: 1 } , () => element);
            this.data = new MatTableDataSource(dataSources[0]);
            this.data.sort = this.sort;
            this.data.paginator = this.paginator;
          });
      }
    })

  }

  applyFilter(filterValue: string) {
    this.data.filter = filterValue.trim().toLowerCase();
    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }

  }






}

