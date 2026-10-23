import { Component, input, model, output, SkipSelf } from '@angular/core';
import { environment } from '../../environments/environment';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { FormValueControl } from '@angular/forms/signals';
import { TuiChevron, TuiDataListWrapper, TuiSelect } from '@taiga-ui/kit';
import { TuiStringHandler } from '@taiga-ui/cdk/types';
import { TuiDataList } from '@taiga-ui/core';

@Component({
  selector: 'app-country-select',
  imports: [FormsModule, TuiChevron, TuiDataListWrapper, TuiSelect, TuiDataList],
  template: `
    <tui-textfield tuiChevron [stringify]="stringify" [invalid]="invalid()">
      <label tuiLabel>{{ label() }}</label>
      <i [class]="'fi fi-' + value()"></i>
      <input tuiSelect [(ngModel)]="value" />

      <tui-data-list *tuiDropdown>
        @for (item of countries; track $index) {
          <button tuiOption type="button" [value]="item.value">
            <i [class]="'fi fi-' + item.value.toLowerCase()"></i>
            {{ item.label }}
          </button>
        }
      </tui-data-list>
    </tui-textfield>
  `,
})
export class CountrySelect implements FormValueControl<string | null> {
  countries: any[] = [];

  label = input<string>('');
  value = model<string | null>('fr');
  invalid = input<boolean>(false);
  touched = input<boolean>(false);
  touch = output<void>();

  constructor() {
    this.countries = environment.countries;
  }

  protected readonly stringify: TuiStringHandler<string> = (id) => {
    return this.countries.find((item) => item.value === id)?.label ?? '';
  };
}
