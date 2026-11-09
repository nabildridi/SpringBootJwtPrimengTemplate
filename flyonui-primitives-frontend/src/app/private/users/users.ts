import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  DataTableModule,
  DataTablePageEvent,
  DataTableSortEvent,
} from '@stackline/angular-data-table-component';
import { AppHttpService } from '../../services/http/app-http.service';
import { HttpTopics } from '../../enums/http-topics';
import { ToastService } from '../../services/toast/toast.service';
import { RequestConverter } from '../../services/table/request-converter';

@Component({
  selector: 'app-users',
  imports: [FormsModule, DataTableModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  data = signal<any[]>([]);
  totalRows = signal<number>(0);

  rowsPerPage = 10;

  columns = [
    { id: 'id', name: 'Id', sortable: true },
    { id: 'username', name: 'Username', sortable: true },
    { id: 'firstname', name: 'firstname', sortable: true },
    { id: 'lastname', name: 'lastname', sortable: true },
  ];

  constructor(
    private appHttpService: AppHttpService,
    private toastService: ToastService,
    private requestConverter: RequestConverter,
  ) {}

  ngOnInit(): void {
    let settings: DataTablePageEvent = {
      page: 1,
      totalRows: 0,
    };
    this.loadFromServer(settings, null);
  }

  sort(sortEvent: DataTableSortEvent) {
    this.loadFromServer(null, sortEvent);
  }

  paginate(pageEvent: DataTablePageEvent) {
    this.loadFromServer(pageEvent, null);
  }

  loadFromServer(pageEvent: DataTablePageEvent | null, sortEvent: DataTableSortEvent | null) {
    console.log(pageEvent);
    let request = this.requestConverter.convert(pageEvent, sortEvent, this.rowsPerPage);

    console.log(request);

    this.appHttpService
      .topic(HttpTopics.Users)
      .add('paginate')
      .post(request)
      .subscribe({
        next: (json: any) => {
          if (json) {
            this.data.set(json['content']);
            this.totalRows.set(json.totalElements);
            this.toastService.showSuccess('all good');
          }
        },
        error: (e) => {},
      });
  }

  onEdit(item: any) {}
  onDelete(row: any) {}
}
