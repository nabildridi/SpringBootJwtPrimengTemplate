import { Service } from '@angular/core';
import { DataTablePageEvent, DataTableSortEvent } from '@stackline/angular-data-table-component';

@Service()
export class RequestConverter {
  //{"first":0,"rows":10,"sortOrder":1,"filters":{"name":{"value":null,"matchMode":"startsWith"},"country.name":{"value":null,"matchMode":"startsWith"},"company":{"value":null,"matchMode":"startsWith"},"representative":{"value":null,"matchMode":"in"}},"globalFilter":null}

  convert(
    pageEvent: DataTablePageEvent | null,
    sortEvent: DataTableSortEvent | null,
    rowsPerPage: number,
  ): any {
    let event: any = {
      rows: rowsPerPage,
      filters: {},
      globalFilter: ['id'],
    };

    if (pageEvent) {
      event.first = (pageEvent.page - 1) * rowsPerPage;
    }

    if (sortEvent) {
      event.first = 0;
      event.sortField = sortEvent.column.id;
      let sortDir = sortEvent.direction;
      if (sortDir == 'asc') {
        event.sortOrder = 1;
      } else {
        event.sortOrder = -1;
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

    return event;
  }
}
