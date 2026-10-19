import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHttpService } from '../../services/http/app-http.service';
import { HttpTopics } from '../../enums/http-topics';
import { DataGrid, ColDef } from '@gridengine/angular-datagrid';
import { LayoutService } from '../../services/layout/layout.service';

interface Row {
  id: number;
  username: string;
  accessdate: Date;
}

@Component({
  selector: 'app-users',
  imports: [CommonModule, DataGrid],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  columnsDefs = [
    {
      field: 'id',
      header: 'Id',
      sortable: true,
      searchable: true,
      type: 'number',
    },
    {
      field: 'username',
      header: 'Username',
      sortable: true,
      searchable: true,
      type: 'multiSelect',
    },
    //{ field: 'firstname', header: 'FirstName', sortable: true, searchable: true, type: "string" },
    {
      field: 'lastname',
      header: 'LastName',
      sortable: true,
      searchable: true,
      type: 'string',
    },
    //{ field: 'email', header: 'Email', sortable: true, searchable: true, type: "string" },
    {
      field: 'accessdate',
      header: 'date',
      sortable: true,
      searchable: true,
      type: 'date',
    },
    {
      field: 'modified',
      header: 'boolean',
      sortable: true,
      searchable: true,
      type: 'boolean',
    },
    {
      field: 'account',
      header: 'Decimal',
      sortable: true,
      searchable: true,
      type: 'decimal',
    },
  ];

  columnDefs: ColDef<Row>[] = [
    { field: 'id', headerName: 'ID', sortable: true },
    { field: 'username', headerName: 'Username', sortable: true },
    { field: 'accessdate', headerName: 'Access date', sortable: true },
  ];

  settings = {
    rowsPerPage: 20,
    globalFilter: true,
    defaultSort: { field: 'id', order: 1 },
  };

  totalRecords: WritableSignal<number> = signal(0);
  data: WritableSignal<any> = signal([]);
  usernames: any[] = [];

  constructor(
    private appHttpService: AppHttpService,
    public layoutService: LayoutService,
  ) {}

  ngOnInit() {
    this.usernames = ['Dexter Dridi', 'Aggi', 'Kai'];
    this.loadFromServer();
  }

  loadFromServer() {
    //event.globalFilter = ['id', 'username', 'lastname'];

    //{"first":0,"rows":10,"sortOrder":1,"filters":{"name":{"value":null,"matchMode":"startsWith"},"country.name":{"value":null,"matchMode":"startsWith"},"company":{"value":null,"matchMode":"startsWith"},"representative":{"value":null,"matchMode":"in"}},"globalFilter":null}

    let event = {
      first: 0,
      rows: 10,
      sortOrder: 1,
      sortField: 'username',
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
          }
        },
        error: (e) => {},
      });
  }
}
