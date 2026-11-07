import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  DatatableComponent,
  PageEvent,
  DataTableColumnCellDirective,
  DataTableColumnDirective,
} from '@siemens/ngx-datatable';
import { AppHttpService } from '../../services/http/app-http.service';
import { HttpTopics } from '../../enums/http-topics';
import { RequestConverter } from '../../services/table/request-converter';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-users',
  imports: [
    FormsModule,
    DatatableComponent,
    DataTableColumnDirective,
    DataTableColumnCellDirective,
  ],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  data = signal<any[]>([]);
  totalRows = signal<number>(0);

  columns = [
    { prop: 'id', name: 'Id' },
    { prop: 'username', name: 'Username' },
    { prop: 'firstname', name: 'firstname' },
    { prop: 'lastname', name: 'lastname' },
  ];

  constructor(
    private appHttpService: AppHttpService,
    private requestConverter: RequestConverter,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {}

  loadFromServer(pageEvent: PageEvent) {
    let request = this.requestConverter.convert(pageEvent);

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
