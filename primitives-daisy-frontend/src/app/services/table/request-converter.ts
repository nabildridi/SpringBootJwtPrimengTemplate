import { Service } from '@angular/core';
import { PageEvent } from '@siemens/ngx-datatable';

@Service()
export class RequestConverter {
  //{"first":0,"rows":10,"sortOrder":1,"filters":{"name":{"value":null,"matchMode":"startsWith"},"country.name":{"value":null,"matchMode":"startsWith"},"company":{"value":null,"matchMode":"startsWith"},"representative":{"value":null,"matchMode":"in"}},"globalFilter":null}

  convert(pageEvent: PageEvent): any {
    let event: any = {
      first: pageEvent.offset * pageEvent.pageSize,
      rows: pageEvent.pageSize,
      filters: {},
      globalFilter: ['id'],
    };

    if (pageEvent.sorts.length == 1) {
      let sort = pageEvent.sorts[0];
      event.sortField = sort.prop.toString();
      if (sort.dir == 'asc') {
        event.sortOrder = 1;
      } else {
        event.sortOrder = -1;
      }
    }

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
    }

    return event;
  }
}
