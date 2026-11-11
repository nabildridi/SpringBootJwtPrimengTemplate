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
          autocomplete="off"
        />
        <label class="input-floating-label ms-0" [for]="inputId" [class.requ]="required()">{{
          label()
        }}</label>
      </div>

      <div class=" shrink-0 space-x-2 content-center">
        @if (value()) {
          <span class="bx bx-x cursor-pointer" (click)="reset()"></span>
        }
        <span
          [class]="show() ? 'bx bx-eye-slash' : 'bx bx-eye'"
          class="cursor-pointer"
          (click)="toggle()"
        ></span>
      </div>
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

  reset() {
    this.value.set(null);
  }
}
