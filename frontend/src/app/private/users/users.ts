import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { AppHttpService } from '../../services/http/app-http.service';
import { HttpTopics } from '../../enums/http-topics';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-users',
  imports: [
    RouterOutlet,
    TableModule,
    ButtonModule,
    InputTextModule,
    MultiSelectModule,
    IconField,
    InputIcon,
    CommonModule,
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
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

  settings = {
    rowsPerPage: 20,
    globalFilter: true,
    emptyMessage: 'No records found',
    defaultSort: { field: 'id', order: 1 },
  };

  totalRecords: WritableSignal<number> = signal(0);
  data: WritableSignal<any> = signal([]);
  usernames: any[] = [];

  constructor(private appHttpService: AppHttpService) {}

  ngOnInit() {
    this.usernames = ['Dexter Dridi', 'Aggi', 'Kai'];
  }

  loadFromServer(event: TableLazyLoadEvent) {
    event.globalFilter = ['username', 'lastname'];

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
