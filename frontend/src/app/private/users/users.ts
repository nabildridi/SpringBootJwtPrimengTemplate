import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ModelSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  type TuiComparator,
  TuiReorder,
  type TuiSortChange,
  TuiSortDirection,
  TuiTable,
  TuiTablePagination,
  type TuiTablePaginationEvent,
} from '@taiga-ui/addon-table';
import {
  TUI_DEFAULT_MATCHER,
  tuiControlValue,
  TuiDay,
  tuiDefaultSort,
  tuiIsPresent,
  tuiToInt,
} from '@taiga-ui/cdk';
import {
  TuiButton,
  TuiCheckbox,
  TuiDropdown,
  TuiInput,
  TuiLabel,
  TuiLoader,
  TuiNumberFormat,
} from '@taiga-ui/core';
import { TuiChevron, TuiInputNumber } from '@taiga-ui/kit';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  filter,
  map,
  type Observable,
  share,
  startWith,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { AppHttpService } from '../../services/http/app-http.service';
import { LayoutService } from '../../services/layout/layout.service';
import { HttpTopics } from '../../enums/http-topics';

interface User {
  readonly id: number;
  readonly username: string;
  readonly accessdate: Date;
}

@Component({
  selector: 'app-users',
  imports: [
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    TuiButton,
    TuiCheckbox,
    TuiChevron,
    TuiDropdown,
    TuiInput,
    TuiInputNumber,
    TuiLabel,
    TuiLoader,
    TuiNumberFormat,
    TuiReorder,
    TuiTable,
    TuiTablePagination,
  ],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  protected readonly size$ = new BehaviorSubject(5);
  protected readonly page$ = new BehaviorSubject(0);
  protected readonly direction$ = new BehaviorSubject<TuiSortDirection>(TuiSortDirection.Asc);
  protected readonly sortKey$ = new BehaviorSubject<keyof User>('id');
  protected readonly total$ = new BehaviorSubject(0);

  protected columns = ['id', 'username', 'accessdate'];

  settings = {
    rowsPerPage: 5,
    globalFilter: true,
    defaultSort: { field: 'id', order: 1 },
  };

  totalRecords: WritableSignal<number> = signal(0);
  data: WritableSignal<any> = signal([]);
  usernames: any[] = [];

  constructor(private appHttpService: AppHttpService) {}

  ngOnInit() {
    this.usernames = ['Dexter Dridi', 'Aggi', 'Kai'];
    this.loadFromServer();
  }

  protected change({ sortKey, sortDirection }: TuiSortChange<User>): void {
    this.sortKey$.next(sortKey!);
    this.direction$.next(sortDirection);
    this.loadFromServer();
  }

  protected onPagination({ page, size }: TuiTablePaginationEvent): void {
    this.page$.next(page);
    this.size$.next(size);
    this.loadFromServer();
  }

  loadFromServer() {
    //event.globalFilter = ['id', 'username', 'lastname'];

    //{"first":0,"rows":10,"sortOrder":1,"filters":{"name":{"value":null,"matchMode":"startsWith"},"country.name":{"value":null,"matchMode":"startsWith"},"company":{"value":null,"matchMode":"startsWith"},"representative":{"value":null,"matchMode":"in"}},"globalFilter":null}

    let event = {
      first: this.page$.getValue() * this.size$.getValue(),
      rows: 5,
      sortOrder: this.direction$.getValue(),
      sortField: this.sortKey$.getValue(),
      filters: {},
      globalFilter: null,
    };

    this.appHttpService
      .topic(HttpTopics.Users)
      .add('paginate')
      .post(event)
      .subscribe({
        next: (json: any) => {
          if (json) {
            this.data.set(json['content']);
            this.totalRecords.set(json.totalElements);
            this.total$.next(json.totalElements);
          }
        },
        error: (e) => {},
      });
  }

  view() {}
}
