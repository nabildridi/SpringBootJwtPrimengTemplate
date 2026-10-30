import { Component, ElementRef, input, model, signal, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TuiIcon, TuiInput } from '@taiga-ui/core';
import * as lod from 'lodash';
import { FormValueControl } from '@angular/forms/signals';
import { TuiActiveZone } from '@taiga-ui/cdk';

@Component({
  imports: [TuiIcon, TuiInput, TuiActiveZone],
  selector: 'app-filtered-dropdown',
  styleUrl: './filtered-dropdown.css',
  templateUrl: './filtered-dropdown.html',
})
export class FilteredDropdown implements FormValueControl<string | null> {
  value = model<string | null>(null);
  invalid = input<boolean>(false);

  countries = signal<any[]>([]);
  opened = signal<boolean>(false);
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
    this.opened.set(false);
  }

  reset() {
    this.selectedItem = null;
    this.value.set(null);
    this.opened.set(false);
  }

  resetSearch() {
    this.term = '';
    this.countries.set(environment.countries);
  }

  protected onZone(activeZoning: boolean): void {
    if (!activeZoning) {
      this.opened.set(false);
    }
  }

  toggle() {
    this.opened.update((value) => !value);
  }
}
