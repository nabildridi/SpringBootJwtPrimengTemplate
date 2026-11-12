import { AfterViewInit, Component, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { AppHttpService } from '../../services/http/app-http.service';
import { HttpTopics } from '../../enums/http-topics';
import { ToastService } from '../../services/toast/toast.service';
import { TableService } from '../../services/table/table-service';
import { LayoutService } from '../../services/layout/layout.service';

@Component({
  selector: 'app-users',
  imports: [FormsModule, NzTableModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  data = signal<any[]>([]);
  totalRows = signal<number>(0);
  globalFilterText = '';
  readonly pageSize = 10;

  constructor(
    private appHttpService: AppHttpService,
    private toastService: ToastService,
    private tableService: TableService,
    public layoutService: LayoutService,
  ) {}

  ngOnInit(): void {
    //let firstPage = this.tableService.getFirstPage();
    //this.loadFromServer(firstPage);
  }

  searchGlobalFilter(value: string) {
    this.globalFilterText = value || '';
    let output = this.tableService.makeGlobalSearch(this.pageSize, this.globalFilterText);
    this.sendRequest(output);
  }

  loadFromServer(receivedEvent: NzTableQueryParams) {
    let request = this.tableService.convert(receivedEvent);
    this.sendRequest(request);
  }

  sendRequest(request: any) {
    this.appHttpService
      .topic(HttpTopics.Users)
      .add('paginate')
      .post(request)
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
