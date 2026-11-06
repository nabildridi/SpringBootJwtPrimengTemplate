import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatatableComponent, PageEvent, TableColumn } from '@siemens/ngx-datatable';
import { AppHttpService } from '../../services/http/app-http.service';
import { HttpTopics } from '../../enums/http-topics';

@Component({
  selector: 'app-users',
  imports: [FormsModule, DatatableComponent],
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

  constructor(private appHttpService: AppHttpService) {}
  ngOnInit(): void {}

  /*
  {
    "count": 0,
    "pageSize": 10,
    "limit": 10,
    "offset": 1,
    "sorts": [
        {
            "dir": "asc",
            "prop": "label"
        }
    ]
}
    */

  loadFromServer(pageEvent: PageEvent) {
    //{"first":0,"rows":10,"sortOrder":1,"filters":{"name":{"value":null,"matchMode":"startsWith"},"country.name":{"value":null,"matchMode":"startsWith"},"company":{"value":null,"matchMode":"startsWith"},"representative":{"value":null,"matchMode":"in"}},"globalFilter":null}

    let event = {
      first: pageEvent.offset,
      rows: pageEvent.pageSize,
      sortOrder: 1,
      sortField: 'id',
      //filters: this.serverFilters,
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
            this.totalRows.set(json.totalElements);
          }
        },
        error: (e) => {},
      });
  }
}
