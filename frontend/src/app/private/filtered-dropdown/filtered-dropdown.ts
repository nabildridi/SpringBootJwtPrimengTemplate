import { Component, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TuiIcon } from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';
import * as lod from 'lodash';

@Component({
  imports: [FormsModule, TuiIcon],
  selector: 'app-filtered-dropdown',
  styleUrl: './filtered-dropdown.css',
  templateUrl: './filtered-dropdown.html',
})
export class FilteredDropdown {
  countries = signal<any[]>([]);
  selectedValue: string = '';

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

  showResult() {
    console.log(this.selectedValue);
  }
}
