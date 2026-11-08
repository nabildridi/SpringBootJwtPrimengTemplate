import { Component, input, model, OnInit, Signal, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'n-password-input',
  imports: [],
  template: `
    <div class="input w-full">
      <div class="input-floating grow">
        <input
          ngpInput
          [id]="inputId"
          [type]="show() ? 'text' : 'password'"
          placeholder=" "
          [value]="value()"
          (input)="value.set($event.target.value)"
          [class.is-invalid]="invalid()"
        />
        <label class="input-floating-label ms-0" [for]="inputId" [class.requ]="required()">{{
          label()
        }}</label>
      </div>
      <button
        type="button"
        (click)="toggle()"
        class="block cursor-pointer"
        aria-label="password toggle"
      >
        <span
          [class]="show() ? 'bx bx-eye-slash' : 'bx bx-eye'"
          class="text-base-content/80 password-active:hidden block size-5 shrink-0"
        ></span>
      </button>
    </div>
  `,
})
export class DaisyPasswordInput implements FormValueControl<string | null>, OnInit {
  value = model<string | null>(null);
  label = input<string>('');
  invalid = input<boolean>(false);
  required = input<boolean>(false);

  inputId: string = uuidv4();
  show = signal<boolean>(false);

  ngOnInit(): void {}

  toggle() {
    this.show.update((value) => !value);
  }
}
