import { Component, input, model, OnInit, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { v4 as uuidv4 } from 'uuid';
import { environment } from '../../environments/environment';
import * as lod from 'lodash';

@Component({
  selector: 'n-select-input',
  imports: [],
  template: `
    <div class="w-full">
      <div class="advance-select relative">
        <div class="input-floating w-full mb-2" [class]="invalid() ? 'border-2 border-error' : ''">
          <button
            type="button"
            aria-expanded="false"
            class="advance-select-toggle select-disabled:pointer-events-none select-disabled:opacity-40"
            (click)="toggle()"
          >
            {{ selectedItem() ? selectedItem().label : '' }}
          </button>
          <label
            class="input-floating-label"
            for="floatingInput"
            [class]="invalid() ? 'is-invalid' : ''"
            >Pays</label
          >
        </div>

        <div
          data-select-dropdown=""
          class="absolute advance-select-menu max-h-52 pt-0 overflow-y-auto"
          role="listbox"
          tabindex="-1"
          aria-orientation="vertical"
          [class.hidden]="!opened()"
        >
          <div class="bg-base-100 sticky top-0 mb-2 px-2 pt-3 z-50">
            <label class="input w-full ">
              <input
                [value]="term()"
                (input)="filter($event)"
                placeholder="Rechercher..."
                class="grow"
              />
              <i class="bx bx-search text-base-content/80 my-auto ms-3 size-5 shrink-0"></i>
            </label>
          </div>

          @for (option of countries(); track $index) {
            <div
              [attr.data-value]="option.value"
              [attr.data-title-value]="option.label"
              tabindex="0"
              class="cursor-pointer advance-select-option selected:select-active"
              [attr.data-id]="$index"
              (click)="selectItem(option)"
            >
              <div class="flex justify-between items-center w-full">
                <span data-title=""
                  ><i [class]="'z-0 fi fi-' + option.value"></i> {{ option.label }}</span
                ><span
                  class=" shrink-0 size-4 text-primary"
                  [class]="
                    selectedItem() && selectedItem().value == option.value ? 'bx bx-check' : ''
                  "
                ></span>
              </div>
            </div>
          }
        </div>

        <div class=" shrink-0 space-x-6 content-center">
          @if (value()) {
            <span
              (click)="reset()"
              class="bx bx-x cursor-pointer  size-6 text-base-content absolute top-1/2 end-3 -translate-y-1/2 "
            ></span>
          }

          <span
            (click)="toggle()"
            [class]="opened() ? 'bx bx-caret-down' : 'bx bx-caret-up'"
            class="cursor-pointer size-6 text-base-content absolute top-1/2 end-3 -translate-y-1/2 "
          ></span>
        </div>
      </div>
    </div>
  `,
})
export class DaisySelectInput implements FormValueControl<string | null>, OnInit {
  value = model<string | null>(null);
  label = input<string>('');
  invalid = input<boolean>(false);
  required = input<boolean>(false);
  icon = input<string | null>(null);

  countries = signal<any[]>([]);
  opened = signal<boolean>(false);
  selectedItem = signal<any>(null);
  term = signal<string>('');
  inputId: string = uuidv4();

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
    this.opened.set(false);
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

  toggle() {
    this.opened.update((value) => !value);
  }
}
