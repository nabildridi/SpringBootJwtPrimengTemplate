import { Component, computed, signal } from '@angular/core';

import { ForTable } from 'forty-cdk/table';

import {
  ForPagination,
  ForPaginationItem,
  ForPaginationNext,
  ForPaginationPrevious,
} from 'forty-cdk/pagination';
import { CommonModule } from '@angular/common';
import { TableRequest, TableService } from '../../services/table/table-service';
import { AppHttpService } from '../../services/http/app-http.service';
import { HttpTopics } from '../../enums/http-topics';

@Component({
  imports: [
    ForTable,
    ForPagination,
    ForPaginationItem,
    ForPaginationPrevious,
    ForPaginationNext,
    CommonModule,
  ],
  selector: 'app-presentation-table',
  styleUrl: './presentation-table.css',
  templateUrl: './presentation-table.html',
})
export class PresentationTable {
  data = signal<any[]>([]);
  totalRows = signal<number>(0);
  pageSize = signal<number>(10);
  page = signal<number>(1);

  totalPages = computed(() => {
    return Math.ceil(this.totalRows() / this.pageSize());
  });

  request: TableRequest;

  constructor(
    private appHttpService: AppHttpService,
    private tableService: TableService,
  ) {
    this.request = this.tableService.getInitialRequest(this.pageSize(), 'id');
  }

  ngOnInit(): void {
    this.sendRequest();
  }

  sendRequest() {
    this.appHttpService
      .topic(HttpTopics.Users)
      .add('paginate')
      .post(this.request)
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

  onPagination(currentPage: number) {
    this.request.first = (currentPage - 1) * this.pageSize();
    this.sendRequest();
  }

  searchGlobalFilter(filterValue: string) {
    this.page.set(0);

    this.request = this.tableService.getGlobalFilter(this.request, filterValue);
    this.sendRequest();
  }

  onEdit(item: any) {}
  onDelete(row: any) {}
}
