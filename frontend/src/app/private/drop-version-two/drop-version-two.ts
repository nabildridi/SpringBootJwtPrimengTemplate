import { Component, signal } from '@angular/core';
import { TuiIcon } from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';
import { form, required, FormField } from '@angular/forms/signals';
import { TuiAccordion } from '@taiga-ui/kit';
import { FilteredDropdown } from '../../shared/filtered-dropdown/filtered-dropdown';

interface PageData {
  country: string | null;
}

@Component({
  imports: [FormsModule, TuiIcon, FormField, FilteredDropdown, TuiAccordion],
  selector: 'app-drop-version-two',
  styleUrl: './drop-version-two.css',
  templateUrl: './drop-version-two.html',
})
export class DropVersionTwo {
  pageModel = signal<PageData>({
    country: null,
  });

  pageForm = form(this.pageModel, (fieldPath) => {
    required(fieldPath.country);
  });

  constructor() {}

  submitLogin(event: Event) {
    event.preventDefault();
    const credentials = this.pageModel();

    console.log(credentials);
  }
}
