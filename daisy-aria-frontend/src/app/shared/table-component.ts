import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  OnInit,
  output,
  signal,
  TemplateRef,
} from '@angular/core';

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
import { CommonModule } from '@angular/common';

export interface ColumnData {
  id: string;
  label: string;
  sortable: boolean;
}

export interface ActionsData {
  id: string;
  label: string;
  severity: string;
  icon: string;
}

export class Request {
  first!: number;
  rows!: number;
  filters!: any;
  globalFilter!: string[] | null;
  sortField?: string;
  sortOrder?: number;
}

@Component({
  selector: 'n-table',
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
    CommonModule,
  ],

  template: `
    <div class="card w-full bg-base-100 shadow-sm">
      <div class="card-body">
        <div class="card-title">
          <div class="input">
            <i class="bx bx-search text-base-content"></i>
            <input
              type="search"
              class="grow"
              placeholder="Rechercher"
              (input)="searchGlobalFilter($any($event.target).value)"
            />
          </div>
        </div>

        <div class="divider mb-2"></div>

        <div forTable mode="table" class="tbl">
          <div role="rowgroup" class="w-full">
            <div forTableHeaderRow class="tbl-row tbl-head">
              @for (column of columns(); track $index) {
                <div
                  forTableHeaderCell
                  forTableSortHeader
                  [column]="column.id"
                  [name]="column.id"
                  [direction]="directionFor(column.id)"
                  (sortChange)="onSort($event)"
                  class="tbl-cell tbl-sort"
                  scope="col"
                >
                  {{ column.label }}
                </div>
              }
              @if (actions() != null && actions()!.length > 0) {
                <div
                  forTableHeaderCell
                  column="actions"
                  name="actions"
                  class="tbl-cell"
                  scope="col"
                >
                  Actions
                </div>
              }
            </div>
          </div>

          <div role="rowgroup" class="w-full">
            @for (item of data(); track $index) {
              <div forTableRow class="tbl-row">
                @for (column of columns(); track $index) {
                  <div forTableCell [name]="column.id" class="tbl-cell">{{ item[column.id] }}</div>
                }
                @if (actions() != null && actions()!.length > 0) {
                  <div forTableCell name="actions" class="tbl-cell space-x-2">
                    @for (action of actions(); track $index) {
                      <button
                        type="button"
                        [class]="'daisy-btn ' + action.severity"
                        (click)="sendAction(action.id, item)"
                      >
                        <i [class]="'bx bx-' + action.icon"></i>
                        {{ action.label }}
                      </button>
                    }
                  </div>
                }
              </div>
            }
          </div>
        </div>

        <div class="w-full card-actions flex justify-between items-center px-4 py-3">
          <div class="text-base ">
            Showing
            <b>{{ (page() - 1) * this.pageSize() + 1 }}-{{ page() * this.pageSize() }}</b>
            of {{ totalRows() }}
          </div>

          <div>
            <nav
              forPagination
              #pg="forPagination"
              ariaLabel="Pagination"
              [(page)]="page"
              [count]="totalPages()"
              [siblingCount]="1"
              [boundaryCount]="1"
              (pageChange)="onPagination($event)"
            >
              <button
                forPaginationPrevious
                class="daisy-btn btn-circle mr-2"
                ariaLabel="Previous page"
              >
                <i class="bx bx-chevron-left"></i>
              </button>

              @for (item of pg.items(); track item.key) {
                @if (item.type === 'page') {
                  <button
                    forPaginationItem
                    class="daisy-btn btn-circle aria-[current=page]:btn-primary mr-2"
                    [page]="item.value!"
                  >
                    {{ item.value }}
                  </button>
                } @else {
                  <span class="mr-2" aria-hidden="true">…</span>
                }
              }

              <button forPaginationNext class="daisy-btn btn-circle" ariaLabel="Next page">
                <i class="bx bx-chevron-right"></i>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DaisyTable implements OnInit {
  data = input.required<any[]>();
  pageSize = input.required<number>();
  totalRows = input.required<number>();
  columns = input.required<ColumnData[]>();
  actions = input<ActionsData[]>([]);
  onUpdate = output<any>();
  onAction = output<any>();

  totalPages = signal<number>(0);

  request: Request = {
    first: 0,
    rows: 0,
    filters: {},
    globalFilter: ['id'],
  };

  protected readonly sort = signal<TableSortDescriptor>({ column: '', direction: 'none' });
  protected readonly page = signal(1);

  constructor() {
    effect(() => {
      this.totalPages.set(Math.ceil(this.totalRows() / this.pageSize()));
    });
  }

  ngOnInit(): void {
    this.request.rows = this.pageSize();
    this.onUpdate.emit(this.request);
  }

  protected directionFor(column: string): TableSortDirection {
    return this.sort().column === column ? this.sort().direction : 'none';
  }

  protected onSort(descriptor: TableSortDescriptor): void {
    this.sort.set(descriptor);

    this.request.first = 0;
    this.page.set(0);

    if (descriptor.direction == 'none') {
      delete this.request.sortField;
      delete this.request.sortOrder;
    }

    if (descriptor.direction == 'ascending') {
      this.request.sortField = descriptor.column;
      this.request.sortOrder = 1;
    }

    if (descriptor.direction == 'descending') {
      this.request.sortField = descriptor.column;
      this.request.sortOrder = -1;
    }

    this.onUpdate.emit(this.request);
  }

  searchGlobalFilter(filterValue: string) {
    this.request.first = 0;
    this.page.set(0);

    if (filterValue != null || filterValue !== '') {
      this.request.filters = { global: { value: filterValue, matchMode: 'equals' } };
    } else {
      this.request.filters = {};
    }
    this.onUpdate.emit(this.request);
  }

  onPagination(currentPage: number) {
    this.request.first = (currentPage - 1) * this.pageSize();
    this.onUpdate.emit(this.request);
  }

  sendAction(actionId: string, item: any) {
    this.onAction.emit({ actionId, item });
  }
}
