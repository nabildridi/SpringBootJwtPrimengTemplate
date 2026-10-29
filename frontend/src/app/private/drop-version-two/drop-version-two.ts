import { Component, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TuiIcon } from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';
import * as lod from 'lodash';

@Component({
  imports: [FormsModule, TuiIcon],
  selector: 'app-drop-version-two',
  styleUrl: './drop-version-two.css',
  templateUrl: './drop-version-two.html',
})
export class DropVersionTwo {
  countries = signal<any[]>([]);
  selectedValue: string = '';
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

  showResult() {
    console.log(this.selectedValue);
  }

  selectItem(item: any) {
    this.selectedItem = item;
    this.selectedValue = item.value;
    this.opened = false;
  }

  reset() {
    this.selectedItem = null;
    this.selectedValue = '';
  }

  resetSearch() {
    this.term = '';
  }
}
