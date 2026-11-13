import { Service } from '@angular/core';
import * as _ from 'lodash';

@Service()
export class DropdownService {
  listToDropdownData(list: any, labelField: any, valueField: any): any[] {
    //clone list
    var clonedList = _.cloneDeep(list);
    if (labelField == null && valueField == null) {
      return this.selfToDropdownData(clonedList);
    }

    if (labelField != null && valueField == null) {
      return this.listToDropdownLabelAndObject(clonedList, labelField);
    }

    let ret: any[] = [];

    for (let entry of clonedList) {
      let _label = _.get(entry, labelField);
      let _value = _.get(entry, valueField);
      ret.push({ label: _label, value: _value });
    }

    return ret;
  }

  private listToDropdownLabelAndObject(list: any, labelField: string): any[] {
    let ret: any[] = [];

    for (let entry of list) {
      let _label = _.get(entry, labelField);
      let _value = entry;
      ret.push({ label: _label, value: _value });
    }

    return ret;
  }

  private selfToDropdownData(list: any): any[] {
    let ret: any[] = [];

    for (let entry of list) {
      ret.push({ label: entry, value: entry });
    }

    return ret;
  }
}
