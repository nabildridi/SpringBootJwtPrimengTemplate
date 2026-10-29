import { Component, input, model, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TuiIcon } from '@taiga-ui/core';
import * as lod from 'lodash';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  imports: [TuiIcon],
  selector: 'app-filtered-dropdown',
  styleUrl: './filtered-dropdown.css',
  templateUrl: './filtered-dropdown.html',
})
export class FilteredDropdown implements FormValueControl<string | null> {
  value = model<string | null>(null);
  invalid = input<boolean>(false);

  countries = signal<any[]>([]);
  opened: boolean = false;
  selectedItem: any = null;

  term: string = '';

  constructor() {
    this.countries.set(environment.countries);
  }

  filter() {
    if (this.term != null && this.term.length > 0) {
      this.search(this.term);
    } else {
      this.countries.set(environment.countries);
    }
  }

  search(toSearch: string) {
    this.countries.set(environment.countries);
    this.countries.set(
      lod.filter(this.countries(), function (o) {
        return o.label.toLowerCase().includes(toSearch);
      }),
    );
  }

  selectItem(item: any) {
    this.selectedItem = item;
    this.value.set(item.value);
    this.opened = false;
  }

  reset() {
    this.selectedItem = null;
    this.value.set(null);
    this.opened = false;
  }

  resetSearch() {
    this.term = '';
    this.countries.set(environment.countries);
  }
}
