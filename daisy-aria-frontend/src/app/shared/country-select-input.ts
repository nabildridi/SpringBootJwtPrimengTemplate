import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';

import { FormValueControl } from '@angular/forms/signals';
import { environment } from '../../environments/environment';
import { CountriesService } from '../services/countries/countries-service';
import {
  ForSelect,
  ForSelectContent,
  ForSelectIndicator,
  ForSelectOption,
  ForSelectTrigger,
  ForSelectValue,
} from 'forty-cdk/select';

@Component({
  selector: 'n-country-select-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    ForSelect,
    ForSelectTrigger,
    ForSelectValue,
    ForSelectContent,
    ForSelectOption,
    ForSelectIndicator,
  ],
  template: `
    <label class="floating-label">
      <span [class.requ]="required()">{{ label() }}</span>

      <div
        forSelect
        #select="forSelect"
        class="select-field"
        [(value)]="selectValues"
        placeholder="Pick your country"
        (valueChange)="change()"
      >
        <button forSelectTrigger type="button" class="select-trigger">
          <span forSelectValue> </span>
          <div>
            <i class="bx bx-x cursor-pointer" (click)="reset()"></i>
            <i class="select-chevron bx bx-chevron-down"></i>
          </div>
        </button>
        @if (select.open()) {
          <div forSelectContent class="select-content" animate.enter="select-pop-in">
            @for (county of countries(); track county.value) {
              <button forSelectOption type="button" class="select-option" [value]="county.value">
                <span forSelectIndicator class="select-indicator">
                  <i class="bx bx-check"></i>
                </span>
                {{ county.label }}
              </button>
            }
          </div>
        }
      </div>
    </label>
  `,
})
export class DaisyCountrySelectInput implements FormValueControl<string | null>, OnInit {
  value = model<string | null>(null);
  label = input<string>('');
  invalid = input<boolean>(false);
  required = input<boolean>(false);

  countries = signal<any[]>([]);

  selectValues = signal<string[]>([]);

  constructor(private countriesService: CountriesService) {
    this.countries.set(environment.countries);
  }

  ngOnInit(): void {
    if (this.value() != null) {
      this.selectValues.set([this.value()!]);
    }
  }

  change() {
    console.log(this.selectValues()[0]);
    this.value.set(this.selectValues()[0]);
  }

  reset() {
    this.value.set(null);
    this.selectValues.set([]);
  }
}
