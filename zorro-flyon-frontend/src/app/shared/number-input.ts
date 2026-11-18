import { Component, input, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'n-number-input',
  imports: [],
  template: `
    <label class="floating-label w-full">
      <span [class.requ]="required()">{{ label() }}</span>

      <label class="input w-full" [class.input-error]="invalid()">
        <i [class]="'bx bx-' + icon()"></i>
        <input
          type="number"
          [value]="value()"
          (input)="setValue($event.target.value)"
          [placeholder]="label()"
          class=" h-10 grow"
          [attr.min]="minimum() != null ? minimum() : ''"
          [attr.max]="maximum() != null ? maximum() : ''"
        />
        @if (value()) {
          <i class="bx bx-x cursor-pointer" (click)="reset()"></i>
        }
        @if (suffix()) {
          <span class="badge badge-primary">{{ suffix() }}</span>
        }
      </label>
    </label>
  `,
})
export class DaisyNumberInput implements FormValueControl<number | null> {
  value = model<number | null>(null);
  label = input<string>('');
  invalid = input<boolean>(false);
  required = input<boolean>(false);
  icon = input<string | null>(null);
  minimum = input<number | null>(null);
  maximum = input<number | null>(null);
  suffix = input<string | null>(null);

  setValue(inputValue: string) {
    this.value.set(Number(inputValue));
  }

  reset() {
    this.value.set(null);
  }
}
