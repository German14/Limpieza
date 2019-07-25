import {Component, OnInit, ViewChild} from '@angular/core';
import {MockServerResultsService} from "../service/service";
import {Page} from "../page/page";
import {CorporateEmployee} from "../page/corporate";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {


  ngOnInit() {
  }
  page = new Page();
  rows = new Array<CorporateEmployee>();
  cache: any = {};

  @ViewChild('myTable', {static: false}) table;

    private isLoading: boolean = false;

  constructor(private serverResultsService: MockServerResultsService) {
    this.setPage({offset: 0, pageSize: 10});
  }

  ngAfterViewInit() {
    this.table.bodyComponent.updatePage = function(direction: string): void {
      let offset = this.indexes.first / this.pageSize;

      if (direction === 'up') {
        offset = Math.ceil(offset);
      } else if (direction === 'down') {
        offset = Math.floor(offset);
      }

      if (direction !== undefined && !isNaN(offset)) {
        this.page.emit({ offset });
      }
    }
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  setPage(pageInfo) {
    this.isLoading = true;
    this.page.pageNumber = pageInfo.offset;
    this.page.size = pageInfo.pageSize;

    this.serverResultsService.getResults(this.page).subscribe(pagedData => {
      this.page = pagedData.page;

      let rows = this.rows;
      if (rows.length !== pagedData.page.totalElements) {
        rows = Array.apply(null, Array(pagedData.page.totalElements));
        rows = rows.map((x, i) => this.rows[i]);
      }

      // calc start
      const start = this.page.pageNumber * this.page.size;

      // set rows to our new rows
      pagedData.data.map((x, i) => rows[i + start] = x);
      this.rows = rows;
      this.isLoading = false;
    });
  }

}
