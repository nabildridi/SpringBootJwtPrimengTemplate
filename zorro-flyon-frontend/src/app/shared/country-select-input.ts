import { Component, input, model, OnInit, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { environment } from '../../environments/environment';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'n-country-select-input',
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
export class DaisyCountrySelectInput implements FormValueControl<string | null>, OnInit {
  value = model<string | null>(null);
  label = input<string>('');
  invalid = input<boolean>(false);
  required = input<boolean>(false);

  countries = signal<any[]>([]);

  constructor() {
    this.countries.set(environment.countries);
  }

  ngOnInit(): void {}

  reset() {
    this.value.set(null);
  }
}
