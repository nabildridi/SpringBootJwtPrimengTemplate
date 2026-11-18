import { Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as lod from 'lodash';

@Service()
export class CountriesService {
  public getCountryName(code: string): string {
    let found = lod.find(environment.countries, {
      value: code,
    });
    if (found) {
      return found.label;
    } else {
      return '';
    }
  }
}
