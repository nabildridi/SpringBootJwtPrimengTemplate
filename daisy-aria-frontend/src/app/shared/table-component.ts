import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  OnInit,
  output,
  signal,
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
import {
  ActionsData,
  ColumnData,
  TableRequest,
  TableService,
} from '../services/table/table-service';

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
                  <div forTableCell name="actions" class="tbl-cell space-x-2 flex-row flex-wrap">
                    @for (action of actions(); track $index) {
                      <button
                        type="button"
                        [class]="'daisy-btn btn-sm ' + action.severity"
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

        <div class="divider mb-2"></div>

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

  //totalPages = signal<number>(0);

  totalPages = computed(() => {
    return Math.ceil(this.totalRows() / this.pageSize());
  });

  request!: TableRequest;

  protected readonly sort = signal<TableSortDescriptor>({ column: '', direction: 'none' });
  protected readonly page = signal(1);

  constructor(private tableService: TableService) {}

  ngOnInit(): void {
    this.request = this.tableService.getInitialRequest(this.pageSize(), 'id');
    this.request.rows = this.pageSize();
    this.onUpdate.emit(this.request);
  }

  protected directionFor(column: string): TableSortDirection {
    return this.sort().column === column ? this.sort().direction : 'none';
  }

  protected onSort(descriptor: TableSortDescriptor): void {
    this.sort.set(descriptor);
    this.page.set(0);

    this.request = this.tableService.getSort(this.request, descriptor);
    this.onUpdate.emit(this.request);
  }

  searchGlobalFilter(filterValue: string) {
    this.page.set(0);

    this.request = this.tableService.getGlobalFilter(this.request, filterValue);

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
