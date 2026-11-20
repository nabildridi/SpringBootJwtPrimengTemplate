import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
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
} from 'forty-cdk/table';

@Component({
  selector: 'app-users',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ForTable, ForTableHeaderRow, ForTableRow, ForTableHeaderCell, ForTableCell],
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
    public layoutService: LayoutService,
  ) {}

  ngOnInit(): void {
    //let firstPage = this.tableService.getFirstPage();
    //this.loadFromServer(firstPage);
    this.sendRequest();
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
