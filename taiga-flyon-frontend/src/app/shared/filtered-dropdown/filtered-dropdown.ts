import { Component, input, model, OnInit, signal } from '@angular/core';
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
export class FilteredDropdown implements FormValueControl<string | null>, OnInit {
  value = model<string | null>(null);
  invalid = input<boolean>(false);
  label = input<string>('');

  countries = signal<any[]>([]);
  opened: boolean = false;
  selectedItem: any = null;

  term: string = '';

  constructor() {
    this.countries.set(environment.countries);
  }
  ngOnInit(): void {
    console.log(this.value());
    this.selectedItem = lod.find(this.countries(), { value: this.value() });
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

  reseting(event: Event) {
    event.stopPropagation();
    this.selectedItem = null;
    this.value.set(null);
  }

  resetSearch() {
    this.term = '';
    this.countries.set(environment.countries);
  }
}
