import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';

import { AppHttpService } from '../../services/http/app-http.service';
import { HttpTopics } from '../../enums/http-topics';
import { ActionsData, ColumnData, DaisyTable } from '../../shared/table-component';

@Component({
  selector: 'app-users',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DaisyTable],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  data = signal<any[]>([]);
  totalRows = signal<number>(0);

  columns: ColumnData[] = [
    { id: 'id', label: 'Id', sortable: true },
    { id: 'firstname', label: 'Firstname', sortable: true },
    { id: 'lastname', label: 'Lastname', sortable: true },
  ];

  actions: ActionsData[] = [
    { id: 'update', label: 'Modifier', severity: 'btn-primary' },
    { id: 'delete', label: 'Supprimer', severity: 'btn-error' },
  ];

  constructor(private appHttpService: AppHttpService) {}

  ngOnInit(): void {}

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

  onAction(event: any) {
    console.log(event);
  }
  onEdit(item: any) {}
  onDelete(row: any) {}
}
