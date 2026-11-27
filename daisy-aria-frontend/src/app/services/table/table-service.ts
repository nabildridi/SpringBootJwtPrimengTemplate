import { Service } from '@angular/core';
import { TableSortDescriptor } from 'forty-cdk/table';

export interface ColumnData {
  id: string;
  label: string;
  sortable: boolean;
}

export interface ActionsData {
  id: string;
  label: string;
  severity: string;
  icon: string;
}

export class TableRequest {
  first!: number;
  rows!: number;
  filters!: any;
  globalFilter!: string[] | null;
  sortField?: string;
  sortOrder?: number;
}

@Service()
export class TableService {
  public getInitialRequest(rowsPerPage: number, ...globalFilters: string[]): TableRequest {
    let request: TableRequest = {
      first: 0,
      rows: rowsPerPage,
      filters: {},
      globalFilter: globalFilters,
    };

    return request;
  }

  public getSort(request: TableRequest, descriptor: TableSortDescriptor): TableRequest {
    request.first = 0;

    if (descriptor.direction == 'none') {
      delete request.sortField;
      delete request.sortOrder;
    }

    if (descriptor.direction == 'ascending') {
      request.sortField = descriptor.column;
      request.sortOrder = 1;
    }

    if (descriptor.direction == 'descending') {
      request.sortField = descriptor.column;
      request.sortOrder = -1;
    }

    return request;
  }

  public getGlobalFilter(request: TableRequest, filterValue: string): TableRequest {
    request.first = 0;

    if (filterValue != null || filterValue !== '') {
      request.filters = { global: { value: filterValue, matchMode: 'equals' } };
    } else {
      request.filters = {};
    }
    return request;
  }
}
