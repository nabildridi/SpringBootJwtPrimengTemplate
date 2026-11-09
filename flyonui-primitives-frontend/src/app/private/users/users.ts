import { AfterViewInit, Component, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  DataTableCellContext,
  DataTableModule,
  DataTablePageEvent,
  DataTableSortEvent,
  DataTableStateChangeEvent,
} from '@stackline/angular-data-table-component';
import { AppHttpService } from '../../services/http/app-http.service';
import { HttpTopics } from '../../enums/http-topics';
import { ToastService } from '../../services/toast/toast.service';
import { TableService } from '../../services/table/table-service';
import { LayoutService } from '../../services/layout/layout.service';

@Component({
  selector: 'app-users',
  imports: [FormsModule, DataTableModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements AfterViewInit {
  @ViewChild('actionsCell') actionsCell!: TemplateRef<any>;

  data = signal<any[]>([]);
  totalRows = signal<number>(0);

  tableEvent: any;

  columns: any[] = [];
  globalFilterText = '';

  constructor(
    private appHttpService: AppHttpService,
    private toastService: ToastService,
    private tableService: TableService,
    public layoutService: LayoutService,
  ) {
    this.tableEvent = this.tableService.getTableEvent(10);
  }

  ngAfterViewInit(): void {
    this.columns = [
      { id: 'id', name: 'Id', sortable: true },
      { id: 'username', name: 'Username', sortable: true },
      { id: 'firstname', name: 'firstname', sortable: true },
      { id: 'lastname', name: 'lastname', sortable: true },
      { id: 'actions', name: 'Actions', cellTemplate: this.actionsCell },
    ];
  }

  ngOnInit(): void {
    let firstPage = this.tableService.getFirstPage();
    this.loadFromServer(firstPage);
  }

  searchGlobalFilter(value: string) {
    this.globalFilterText = value || '';
    this.tableEvent = this.tableService.makeGlobalSearch(this.tableEvent, this.globalFilterText);
    this.loadFromServer(this.tableEvent);
  }

  loadFromServer(tableEvent: any) {
    const isPageEvent = (event: any): event is DataTablePageEvent =>
      (event as DataTablePageEvent).page !== undefined;
    const isSortEvent = (event: any): event is DataTableSortEvent =>
      (event as DataTableSortEvent).direction !== undefined;

    let pageEvent: DataTablePageEvent | null = null;
    if (isPageEvent(tableEvent)) {
      pageEvent = <DataTablePageEvent>tableEvent;
    }

    let sortEvent: DataTableSortEvent | null = null;
    if (isSortEvent(tableEvent)) {
      sortEvent = <DataTableSortEvent>tableEvent;
    }

    this.tableEvent = this.tableService.convert(pageEvent, sortEvent, this.tableEvent);

    this.appHttpService
      .topic(HttpTopics.Users)
      .add('paginate')
      .post(this.tableEvent)
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
