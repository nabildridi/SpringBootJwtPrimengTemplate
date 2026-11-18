import { Component, input, model, OnInit } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'n-text-input',
  imports: [],
  template: `
    <label class="floating-label ">
      <span [class.requ]="required()">{{ label() }}</span>

      <label class="input border-2" [class.input-error]="invalid()">
        <i [class]="'bx bx-' + icon()"></i>
        <input
          [type]="type()"
          [value]="value()"
          (input)="value.set($event.target.value)"
          [placeholder]="label()"
          class="grow h-12"
        />

        @if (value()) {
          <i class="bx bx-x cursor-pointer" (click)="reset()"></i>
        }
      </label>
    </label>
  `,
})
export class DaisyTextInput implements FormValueControl<string | null>, OnInit {
  value = model<string | null>(null);
  label = input<string>('');
  invalid = input<boolean>(false);
  required = input<boolean>(false);
  type = input<string>('text');
  icon = input<string | null>(null);

  ngOnInit(): void {}

  reset() {
    this.value.set(null);
  }
}
