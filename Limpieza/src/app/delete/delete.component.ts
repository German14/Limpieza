import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material";
import {DataService} from "../service/service";
import {DataServiceClients} from "../service/serviceClients";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  value:any;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private service: DataService,
               private serviceClients: DataServiceClients, public dialog: MatDialog) {}


  ngOnInit() {
  }

  close() {

  }

  delete() {
    if(this.data.table === 'TableComponents'){
      this.service.DeleteRepoIssues(this.data.row);
    } else {
      this.serviceClients.DeleteRepoClients(this.data.row);
    }


    this.dialog.closeAll();
  }
}
