import { Component, input, model, OnInit, Signal, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'n-password-input',
  imports: [],
  template: `
    <label class="floating-label">
      <span [class.requ]="required()">{{ label() }}</span>

      <label class="input border-2" [class.input-error]="invalid()">
        <i class="bx bx-key"></i>
        <input
          nz-input
          [type]="show() ? 'text' : 'password'"
          [value]="value()"
          (input)="value.set($event.target.value)"
          [placeholder]="label()"
          class="grow h-12"
        />

        @if (value()) {
          <i class="bx bx-x cursor-pointer" (click)="reset()"></i>
        }
        <i
          [class]="show() ? 'bx bx-eye-slash' : 'bx bx-eye'"
          class="cursor-pointer"
          (click)="toggle()"
        ></i>
      </label>
    </label>
  `,
})
export class DaisyPasswordInput implements FormValueControl<string | null>, OnInit {
  value = model<string | null>(null);
  label = input<string>('');
  invalid = input<boolean>(false);
  required = input<boolean>(false);

  show = signal<boolean>(false);

  ngOnInit(): void {}

  toggle() {
    this.show.update((value) => !value);
  }

  reset() {
    this.value.set(null);
  }
}
