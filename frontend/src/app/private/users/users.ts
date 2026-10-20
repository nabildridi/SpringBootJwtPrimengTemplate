import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  type TuiSortChange,
  TuiSortDirection,
  TuiTable,
  TuiTablePagination,
  type TuiTablePaginationEvent,
} from '@taiga-ui/addon-table';

import { TuiInput } from '@taiga-ui/core';
import { AppHttpService } from '../../services/http/app-http.service';
import { HttpTopics } from '../../enums/http-topics';

@Component({
  selector: 'app-users',
  imports: [FormsModule, TuiInput, TuiTable, TuiTablePagination],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  sizeSignal = signal<number>(5);
  pageSignal = signal<number>(0);
  directionSignal = signal<TuiSortDirection>(TuiSortDirection.Asc);
  sortKeySignal = signal<keyof any>('id');
  totalSignal = signal<number>(0);

  filterValue: string | null = null;
  serverFilters: any = {};

  protected columns = ['id', 'username', 'accessdate'];

  data: WritableSignal<any> = signal([]);

  constructor(private appHttpService: AppHttpService) {}

  ngOnInit() {
    this.loadFromServer();
  }

  protected onSort({ sortKey, sortDirection }: TuiSortChange<any>): void {
    this.sortKeySignal.set(sortKey!);
    this.directionSignal.set(sortDirection);
    this.loadFromServer();
  }

  protected onPagination({ page, size }: TuiTablePaginationEvent): void {
    this.pageSignal.set(page);
    this.sizeSignal.set(size);
    this.loadFromServer();
  }

  onFilter(event: Event) {
    if (this.filterValue != null || this.filterValue !== '') {
      this.serverFilters = { global: { value: this.filterValue, matchMode: 'equals' } };
    } else {
      this.serverFilters = {};
    }
    this.loadFromServer();
  }

  loadFromServer() {
    //{"first":0,"rows":10,"sortOrder":1,"filters":{"name":{"value":null,"matchMode":"startsWith"},"country.name":{"value":null,"matchMode":"startsWith"},"company":{"value":null,"matchMode":"startsWith"},"representative":{"value":null,"matchMode":"in"}},"globalFilter":null}

    let event = {
      first: this.pageSignal() * this.sizeSignal(),
      rows: 5,
      sortOrder: this.directionSignal(),
      sortField: this.sortKeySignal(),
      filters: this.serverFilters,
      globalFilter: ['id'],
    };

    this.appHttpService
      .topic(HttpTopics.Users)
      .add('paginate')
      .post(event)
      .subscribe({
        next: (json: any) => {
          if (json) {
            this.data.set(json['content']);
            this.totalSignal.set(json.totalElements);
          }
        },
        error: (e) => {},
      });
  }

  view() {}
}
