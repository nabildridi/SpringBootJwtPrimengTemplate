import { Service } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

@Service()
export class TableService {
  //{"first":0,"rows":10,"sortOrder":1,"filters":{"name":{"value":null,"matchMode":"startsWith"},"country.name":{"value":null,"matchMode":"startsWith"},"company":{"value":null,"matchMode":"startsWith"},"representative":{"value":null,"matchMode":"in"}},"globalFilter":null}

  /*
  {
  "pageIndex": 1,
  "pageSize": 10,
  "sort": [
    {
      "key": "id",
      "value": "ascend"
    },
    {
      "key": "username",
      "value": null
    },
    {
      "key": "lastname",
      "value": null
    }
  ],
  "filter": []
}
*/
  convert(tableEvent: NzTableQueryParams): any {
    let output: any = {
      first: (tableEvent.pageIndex - 1) * tableEvent.pageSize,
      rows: tableEvent.pageSize,
      filters: {},
      globalFilter: ['id'],
    };

    for (let sortItem of tableEvent.sort) {
      if (sortItem.value != null) {
        output.sortField = sortItem.key;
        let sortDir = sortItem.value;
        if (sortDir == 'ascend') {
          output.sortOrder = 1;
        } else {
          output.sortOrder = -1;
        }
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

    return output;
  }

  makeGlobalSearch(pageSize: number, filterValue: string): any {
    let output: any = {
      first: 0,
      rows: pageSize,
      filters: {},
      globalFilter: ['id'],
    };

    if (filterValue != null || filterValue !== '') {
      output.filters = { global: { value: filterValue, matchMode: 'equals' } };
    } else {
      output.filters = {};
    }

    return output;
  }
}
