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
import { v4 as uuidv4 } from 'uuid';

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
    <div
      forSelect
      #select="forSelect"
      [(value)]="selectValues"
      placeholder=" "
      (valueChange)="change()"
      [compareWith]="byCode"
      [itemToFormValue]="toCode"
    >
      <div forSelectTrigger class="relative w-full">
        <span class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
          @if (value()) {
            <i [class]="'fi fi-' + value()"></i>
          }
        </span>

        <span
          forSelectValue
          [id]="inputId"
          class="peer block h-14 w-full appearance-none rounded-md border border-base-200 bg-base-100
             px-3 ps-11 pe-11 pb-2.5 pt-6 text-sm 
             focus:border-primary focus:outline-none focus:ring-0 hover:border-primary
             "
          [ariaInvalid]="invalid()"
        >
        </span>

        <label
          [for]="inputId"
          class="pointer-events-none absolute start-11 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm 
             duration-200
             peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
             peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-primary"
          [class.requ]="required()"
          >{{ label() }}
        </label>

        <span class="cursor-pointer  absolute inset-y-0 end-0 flex items-center pe-3.5 space-x-2">
          @if (value()) {
            <i class="bx bx-x cursor-pointer" (click)="clear()"></i>
          }
          <i class="select-chevron bx bx-chevron-down"></i>
        </span>
      </div>

      @if (select.open()) {
        <div forSelectContent class="select-content" animate.enter="select-pop-in">
          @for (country of countries(); track country.value) {
            <button forSelectOption type="button" class="select-option" [value]="country">
              <span forSelectIndicator class="select-indicator">
                <i class="bx bx-check"></i>
              </span>
              {{ country.label }}
            </button>
          }
        </div>
      }
    </div>
  `,
})
export class DaisyCountrySelectInput implements FormValueControl<string | null>, OnInit {
  value = model<string | null>(null);
  label = input<string>('');
  invalid = input<boolean>(false);
  required = input<boolean>(false);

  countries = signal<any[]>([]);

  selectValues = signal<any[]>([]);
  inputId: string = uuidv4();

  constructor(private countriesService: CountriesService) {
    this.countries.set(environment.countries);
  }

  ngOnInit(): void {
    if (this.value() != null) {
      this.selectValues.set([this.countriesService.getCountryObject(this.value()!)]);
    }
  }

  change() {
    this.value.set(this.selectValues()[0].value);
  }

  clear() {
    this.value.set(null);
    this.selectValues.set([]);
  }

  protected readonly byCode = (a: any, b: any): boolean => a.value === b.value;
  protected readonly toCode = (country: any): string => country.label;
}
