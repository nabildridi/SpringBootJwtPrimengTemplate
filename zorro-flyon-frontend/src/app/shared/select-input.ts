import { Component, input, model, OnInit, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { v4 as uuidv4 } from 'uuid';
import { environment } from '../../environments/environment';
import * as lod from 'lodash';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'n-select-input',
  imports: [NzSelectModule, FormsModule],
  template: `
    <label class="floating-label">
      <span [class.requ]="required()">{{ label() }}</span>
      <nz-select
        nzShowSearch
        nzAllowClear
        nzPlaceHolder=" "
        class="w-full"
        [nzStatus]="invalid() ? 'error' : ''"
        (nzOnClear)="reset()"
        [(ngModel)]="value"
        nzSize="large"
      >
        @for (option of countries(); track $index) {
          <nz-option nzCustomContent [nzLabel]="option.label" [nzValue]="option.value">
            <i [class]="'z-0 fi fi-' + option.value"></i> {{ option.label }}
          </nz-option>
        }
      </nz-select>
    </label>
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
    console.log(item);
    /*
    this.selectedItem.set(item);
    this.value.set(item.value);
    this.opened.set(false)*/
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
