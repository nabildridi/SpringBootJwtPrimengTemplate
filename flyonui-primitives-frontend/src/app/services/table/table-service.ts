import { Service } from '@angular/core';
import { DataTablePageEvent, DataTableSortEvent } from '@stackline/angular-data-table-component';

@Service()
export class TableService {
  //{"first":0,"rows":10,"sortOrder":1,"filters":{"name":{"value":null,"matchMode":"startsWith"},"country.name":{"value":null,"matchMode":"startsWith"},"company":{"value":null,"matchMode":"startsWith"},"representative":{"value":null,"matchMode":"in"}},"globalFilter":null}

  convert(
    pageEvent: DataTablePageEvent | null,
    sortEvent: DataTableSortEvent | null,
    tableEvent: any,
  ): any {
    if (pageEvent) {
      tableEvent.first = (pageEvent.page - 1) * tableEvent.rows;
    }

    if (sortEvent) {
      tableEvent.first = 0;
      tableEvent.sortField = sortEvent.column.id;
      let sortDir = sortEvent.direction;
      if (sortDir == 'asc') {
        tableEvent.sortOrder = 1;
      } else {
        tableEvent.sortOrder = -1;
      }
    }

    /*

    if (pageEvent.sorts.length > 1) {
      let multiSortMeta: any[] = [];
      for (let sort of pageEvent.sorts) {
        let item: any = {};
        item.field = sort.prop.toString();
        if (sort.dir == 'asc') {
          item.order = 1;
        } else {
          item.order = -1;
        }
        multiSortMeta.push(item);
      }
      event.multiSortMeta = multiSortMeta;
    }*/

    return tableEvent;
  }

  getFirstPage(): any {
    let firstPage: DataTablePageEvent = {
      page: 1,
      totalRows: 0,
    };

    return firstPage;
  }

  getTableEvent(pageSize: number): any {
    let tableEvent: any = {
      rows: pageSize,
      filters: {},
      globalFilter: ['id'],
    };

    return tableEvent;
  }

  makeGlobalSearch(tableEvent: any, filterValue: string): any {
    tableEvent.first = 0;

    if (filterValue != null || filterValue !== '') {
      tableEvent.filters = { global: { value: filterValue, matchMode: 'equals' } };
    } else {
      tableEvent.filters = {};
    }

    return tableEvent;
  }
}
