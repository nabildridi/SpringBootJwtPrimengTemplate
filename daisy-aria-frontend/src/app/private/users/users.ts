import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';

import { AppHttpService } from '../../services/http/app-http.service';
import { HttpTopics } from '../../enums/http-topics';
import { ToastService } from '../../services/toast/toast.service';
import { LayoutService } from '../../services/layout/layout.service';
import {
  ForTable,
  ForTableCell,
  ForTableHeaderCell,
  ForTableHeaderRow,
  ForTableRow,
  ForTableSortHeader,
  type TableSortDescriptor,
  type TableSortDirection,
} from 'forty-cdk/table';

import {
  ForPagination,
  ForPaginationItem,
  ForPaginationNext,
  ForPaginationPrevious,
} from 'forty-cdk/pagination';

@Component({
  selector: 'app-users',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ForTable,
    ForTableHeaderRow,
    ForTableRow,
    ForTableHeaderCell,
    ForTableCell,
    ForTableSortHeader,
    ForPagination,
    ForPaginationItem,
    ForPaginationPrevious,
    ForPaginationNext,
  ],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  data = signal<any[]>([]);
  totalRows = signal<number>(0);
  globalFilterText = '';
  readonly pageSize = 10;
  protected readonly sort = signal<TableSortDescriptor>({ column: '', direction: 'none' });
  protected readonly page = signal(1);

  constructor(
    private appHttpService: AppHttpService,
    private toastService: ToastService,
    public layoutService: LayoutService,
  ) {}

  ngOnInit(): void {
    //let firstPage = this.tableService.getFirstPage();
    //this.loadFromServer(firstPage);
    this.sendRequest();
  }

  protected directionFor(column: string): TableSortDirection {
    return this.sort().column === column ? this.sort().direction : 'none';
  }

  protected onSort(descriptor: TableSortDescriptor): void {
    console.log(descriptor);
    this.sort.set(descriptor);
  }

  sendRequest() {
    const firstPage = {
      first: 0,
      rows: 10,
      filters: {},
      globalFilter: null,
      sortField: 'id',
      sortOrder: 1,
    };

    this.appHttpService
      .topic(HttpTopics.Users)
      .add('paginate')
      .post(firstPage)
      .subscribe({
        next: (json: any) => {
          if (json) {
            this.data.set(json['content']);
            this.totalRows.set(json.totalElements);
          }
        },
        error: (e) => {},
      });
  }

  onEdit(item: any) {}
  onDelete(row: any) {}
}
