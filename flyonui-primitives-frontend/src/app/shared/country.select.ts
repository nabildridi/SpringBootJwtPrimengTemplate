import { Component, input, model, OnInit, signal } from '@angular/core';
import * as lod from 'lodash';
import { FormValueControl } from '@angular/forms/signals';
import { environment } from '../../environments/environment';

import {
  NgpSelect,
  NgpSelectDropdown,
  NgpSelectInput,
  NgpSelectList,
  NgpSelectOption,
  NgpSelectPortal,
} from 'ng-primitives/select';

@Component({
  selector: 'n-country-select',
  imports: [
    NgpSelect,
    NgpSelectDropdown,
    NgpSelectInput,
    NgpSelectList,
    NgpSelectOption,
    NgpSelectPortal,
  ],
  template: `
    <label class="floating-label">
      <span [class.requ]="required()">{{ label() }}</span>
      <div class="input w-full" [attr.data-invalid]="invalid() ? '' : null">
        <div
          [(ngpSelectValue)]="value"
          (ngpSelectOpenChange)="onOpen($event)"
          ngpSelect
          aria-labelledby="select-search-label"
          class="w-full"
        >
          <div class="flex h-10 justify-between w-full">
            <div class="content-center">
              @if (value(); as selected) {
                <span class="w-full">
                  <i [class]="'fi fi-' + selectedItem().value"></i>
                  {{ selectedItem()!.label }}</span
                >
              }
            </div>
            <div class="content-center space-x-2 text-xl">
              @if (value()) {
                <i class="bx bx-x cursor-pointer" (click)="reset()"></i>
              }
              <i
                [class]="opened() ? 'bx bx-caret-down' : 'bx bx-caret-up'"
                class="cursor-pointer"
              ></i>
            </div>
          </div>
          <div *ngpSelectPortal ngpSelectDropdown aria-label="Searchable select" class="w-full">
            <div class="w-full p-2 bg-base-200">
              <label class="input w-full ">
                <input [value]="term()" (input)="filter($event)" ngpSelectInput class="grow" />
                <i class="bx bx-search text-base-content/80 my-auto ms-3 size-5 shrink-0"></i>
              </label>
            </div>
            <div
              class="max-h-52 overflow-y-auto bg-base-200 w-full"
              ngpSelectList
              aria-label="Options"
            >
              @for (option of countries(); track $index) {
                <div
                  [ngpSelectOptionValue]="option.value"
                  ngpSelectOption
                  (click)="selectItem(option)"
                  class="content-center"
                >
                  <i [class]="'fi fi-' + option.value"></i>
                  {{ option.label }}
                </div>
              }
            </div>
            <!-- outside the listbox, and always rendered so the status is announced -->
            <div class="empty-message" role="status">
              @if (countries().length === 0) {
                No options found
              }
            </div>
          </div>
        </div>
      </div>
    </label>
  `,
  styleUrl: './country-select.css',
})
export class CountrySelect implements FormValueControl<string | null>, OnInit {
  value = model<string | null>(null);
  label = input<string>('');
  invalid = input<boolean>(false);
  required = input<boolean>(false);

  countries = signal<any[]>([]);
  opened = signal<boolean>(false);
  selectedItem = signal<any>(null);
  term = signal<string>('');

  constructor() {
    this.countries.set(environment.countries);
  }

  ngOnInit(): void {
    this.selectedItem.set(lod.find(this.countries(), { value: this.value() }));
  }

  filter(event: Event) {
    this.term.set((event.target as HTMLInputElement).value);
    if (this.term() != null && this.term().length > 0) {
      this.search(this.term());
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
    this.selectedItem.set(item);
    this.value.set(item.value);
  }

  reset() {
    this.selectedItem.set(null);
    this.value.set(null);
  }

  resetSearch() {
    this.term.set('');
    this.countries.set(environment.countries);
  }

  protected onOpen(open: boolean): void {
    this.opened.set(open);
    if (!open) {
      this.term.set('');
      this.countries.set(environment.countries);
    }
  }
}
