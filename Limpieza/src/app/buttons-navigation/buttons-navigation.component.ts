import {Component, EventEmitter, OnInit, ViewChild, Output} from '@angular/core';
import {DataService, GithubIssue} from '../service/service';
import {AuthenticationService} from '../_service/AuthentificationService';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormComponent} from '../form/form.component';
import {ReplaySubject, Subject, Observable} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {TableComponent} from "../table/table.component";

@Component({
  selector: 'buttons-navigation',
  templateUrl: './buttons-navigation.component.html',
  styleUrls: ['./buttons-navigation.component.scss']
})
export class ButtonsNavigationComponent implements OnInit {
  @Output() childMessage = new EventEmitter();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  data: MatTableDataSource<GithubIssue>;

  private newCoordinateForm = new Subject<any>();

  constructor(private tableDataBase: DataService,
              private dialog: MatDialog,
              private authorization: AuthenticationService,
              private router: Router
  ) { }

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

 openForm(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = row;
    dialogConfig.width = '500px';
    const dialogRef = this.dialog.open(FormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  exportAsXLSX() {
    this.tableDataBase.exportAsExcelFile(this.data.data, 'Trabajadoras');
  }

  logout() {
    this.authorization.logout();
    this.router.navigate(['/login']);
  }

}
