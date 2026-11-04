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
    <div class="select w-full">
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
              <span class="select-value w-full">{{ selectedItem()!.label }}</span>
            }
          </div>
          <div class="content-center space-x-2 text-xl">
            <i class="bx bx-x"></i>
            <i [class]="opened() ? 'bx bx-caret-down' : 'bx bx-caret-up'"></i>
          </div>
        </div>
        <div *ngpSelectPortal ngpSelectDropdown aria-label="Searchable select" class="w-full">
          <input
            [value]="term"
            (input)="filter()"
            ngpSelectInput
            placeholder="Search…"
            aria-labelledby="select-search-label"
            class="w-full"
          />
          <div class="select-scrollable bg-base-300 w-full" ngpSelectList aria-label="Options">
            @for (option of countries(); track option) {
              <div
                [ngpSelectOptionValue]="option.value"
                ngpSelectOption
                (click)="selectItem(option)"
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
  `,
  styles: `
    .select-field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .select-label {
      font-size: 13px;
      font-weight: 510;
      letter-spacing: -0.011em;
      color: var(--ngp-text-secondary);
    }
    [ngpSelect] {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 2.125rem;
      width: 300px;
      border-radius: 0.5rem;
      border: none;
      background-color: var(--ngp-background);
      box-shadow: var(--ngp-input-shadow);
      box-sizing: border-box;
    }
    [ngpSelect][data-focus] {
      outline: 2px solid var(--ngp-focus-ring);
      outline-offset: 2px;
    }
    .select-value,
    .select-placeholder {
      display: flex;
      align-items: center;
      flex: 1;
      padding: 0 16px;
      background-color: transparent;
      color: var(--ngp-text-primary);
      font-family: inherit;
      font-size: 14px;
      height: 100%;
    }
    .select-placeholder {
      color: var(--ngp-text-secondary);
    }
    /* Search field pinned at the top of the dropdown */
    [ngpSelectInput] {
      width: 100%;
      min-width: 0;
      height: 2.25rem;
      padding: 0 0.75rem;
      border: none;
      border-bottom: 1px solid var(--ngp-border);
      background-color: transparent;
      color: var(--ngp-text-primary);
      font-family: inherit;
      font-size: 14px;
      outline: none;
      box-sizing: border-box;
    }
    [ngpSelectInput]::placeholder {
      color: var(--ngp-text-tertiary);
    }
    [ngpSelectInput][data-focus-visible] {
      border-bottom-color: var(--ngp-focus-ring);
      box-shadow: inset 0 -1px 0 0 var(--ngp-focus-ring);
    }

    [ngpSelectDropdown] {
      background-color: var(--ngp-background);
      border: 1px solid var(--ngp-border);
      padding: 0;
      border-radius: 0.75rem;
      outline: none;
      position: absolute;
      overflow: hidden;
      animation: select-input-show 0.1s ease-out;
      width: var(--ngp-select-width);
      box-shadow: var(--ngp-shadow-lg);
      box-sizing: border-box;
      margin-top: 4px;
      z-index: 1001;
    }
    [ngpSelectDropdown][data-exit] {
      animation: select-input-hide 0.1s ease-out;
    }
    .select-scrollable {
      max-height: 200px;
      overflow-y: auto;
      padding: 0.25rem;
    }
    [ngpSelectOption] {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.375rem 0.75rem;
      cursor: pointer;
      border-radius: 0.5rem;
      width: 100%;
      height: 2.125rem;
      font-size: 14px;
      color: var(--ngp-text-primary);
      box-sizing: border-box;
    }
    [ngpSelectOption][data-hover] {
      background-color: var(--ngp-background-hover);
    }
    [ngpSelectOption][data-press] {
      background-color: var(--ngp-background-active);
    }
    [ngpSelectOption][data-active] {
      background-color: var(--ngp-background-active);
    }
    [ngpSelectOption][data-selected] {
      color: var(--ngp-primary);
      font-weight: 510;
    }
    .empty-message:empty {
      display: none;
    }
    .empty-message {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem;
      color: var(--ngp-text-secondary);
      font-size: 14px;
      font-weight: 510;
      text-align: center;
    }
    @keyframes select-input-show {
      0% {
        opacity: 0;
        transform: translateY(-10px) scale(0.9);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    @keyframes select-input-hide {
      0% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      100% {
        opacity: 0;
        transform: translateY(-10px) scale(0.9);
      }
    }
  `,
})
export class CountrySelect implements FormValueControl<string | null>, OnInit {
  value = model<string | null>(null);
  label = input<string>('');
  invalid = input<boolean>(false);
  required = input<boolean>(false);

  countries = signal<any[]>([]);
  opened = signal<boolean>(false);
  selectedItem = signal<any>(null);
  term: string = '';

  constructor() {
    this.countries.set(environment.countries);
  }

  ngOnInit(): void {
    this.selectedItem.set(lod.find(this.countries(), { value: this.value() }));
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
    this.selectedItem.set(item);
    this.value.set(item.value);
    this.opened.set(false);
  }

  reset() {
    this.selectedItem.set(null);
    this.value.set(null);
    this.opened.set(false);
  }

  resetSearch() {
    this.term = '';
    this.countries.set(environment.countries);
  }

  protected onOpen(open: boolean): void {
    this.opened.set(open);
    if (!open) {
      this.term = '';
    }
  }
}
