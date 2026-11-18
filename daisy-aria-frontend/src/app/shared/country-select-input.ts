import {
  afterRenderEffect,
  Component,
  computed,
  input,
  model,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { Combobox, ComboboxPopup, ComboboxWidget } from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormValueControl } from '@angular/forms/signals';
import { environment } from '../../environments/environment';
import { CountriesService } from '../services/countries/countries-service';

@Component({
  selector: 'n-country-select-input',
  imports: [Combobox, ComboboxPopup, ComboboxWidget, Listbox, Option, OverlayModule],

  template: `
    <label class="floating-label">
      <span [class.requ]="required()">{{ label() }}</span>

      <div
        ngCombobox
        #combobox="ngCombobox"
        [(expanded)]="popupExpanded"
        [preserveContent]="true"
        class="ariaSelect"
        [ariaInvalid]="invalid()"
      >
        <div class="flex justify-between w-full">
          <div class="grow  content-center">
            <span class="pointer-events-none space-x-2">
              <span translate="no" aria-hidden="true">
                <i [class]="'fi fi-' + displayIcon()"></i>
              </span>
              <span>{{ displayValue() }}</span>
            </span>
          </div>
          <div class="flex-none justify-center content-center space-x-2">
            @if (value()) {
              <span class="bx bx-x cursor-pointer text-base" (click)="reset()"></span>
            }
            <span class="caret-arrow bx bx-caret-down" translate="no" aria-hidden="true"></span>
          </div>
        </div>
      </div>

      <ng-template
        [cdkConnectedOverlay]="{ origin: combobox.element, usePopover: 'inline', matchWidth: true }"
        [cdkConnectedOverlayOpen]="popupExpanded()"
      >
        <ng-template ngComboboxPopup [combobox]="combobox">
          <div class="select-popup-container">
            <div
              #listbox="ngListbox"
              ngListbox
              ngComboboxWidget
              [tabindex]="-1"
              focusMode="activedescendant"
              selectionMode="explicit"
              [(value)]="selectedValues"
              [activeDescendant]="listbox.activeDescendant()"
              (click)="onCommit()"
              (keydown.enter)="onCommit()"
              (keydown.space)="onCommit()"
            >
              @for (country of countries(); track country.value) {
                <div
                  ngOption
                  [value]="country.value"
                  [label]="country.label"
                  class="flex justify-between "
                >
                  <div class="grow  content-center space-x-2">
                    <span translate="no" aria-hidden="true" [class]="'fi fi-' + country.value">
                    </span>
                    <span class="example-option-text">{{ country.label }}</span>
                  </div>
                  <div class="flex-none justify-center content-center">
                    <span translate="no" class="select-option-check" aria-hidden="true"
                      ><i class="bx bx-check text-lg"></i
                    ></span>
                  </div>
                </div>
              }
            </div>
          </div>
        </ng-template>
      </ng-template>
    </label>
  `,
})
export class DaisyCountrySelectInput implements FormValueControl<string | null>, OnInit {
  value = model<string | null>(null);
  label = input<string>('');
  invalid = input<boolean>(false);
  required = input<boolean>(false);

  countries = signal<any[]>([]);

  readonly listbox = viewChild(Listbox);
  readonly selectedValues = signal<string[]>([]);
  readonly popupExpanded = signal(false);
  readonly displayIcon = computed(() => {
    const val = this.selectedValues()[0];
    return val ? val : '';
  });

  readonly displayValue = computed(
    () => this.countriesService.getCountryName(this.selectedValues()[0]) || '',
  );

  constructor(private countriesService: CountriesService) {
    this.countries.set(environment.countries);
    afterRenderEffect(() => {
      this.listbox()?.scrollActiveItemIntoView();
    });
  }

  ngOnInit(): void {
    if (this.value() != null) {
      this.selectedValues.set([this.value()!]);
    }
  }

  reset() {
    this.value.set(null);
    this.selectedValues.set([]);
  }

  onCommit() {
    if (this.selectedValues() && this.selectedValues()[0]) {
      this.value.set(this.selectedValues()[0]);
    }
    this.popupExpanded.set(false);
  }
}
