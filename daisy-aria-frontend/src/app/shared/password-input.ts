import { Component, input, model, OnInit, Signal, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'n-password-input',
  imports: [],
  template: `
    <div class="relative w-full">
      <span class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
        <i class="bx bx-key" [ariaInvalid]="invalid()"></i>
      </span>

      <input
        [type]="show() ? 'text' : 'password'"
        [value]="value()"
        (input)="value.set($event.target.value)"
        [ariaInvalid]="invalid()"
        [id]="inputId"
        placeholder=" "
        class="peer block w-full appearance-none rounded-md border border-base-200  bg-base-100
             px-3 ps-11 pe-11 pb-2.5 pt-6 text-sm 
             focus:border-primary focus:outline-none focus:ring-0 hover:border-primary"
      />

      <label
        [for]="inputId"
        class="pointer-events-none absolute start-11 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm 
             duration-200
             peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
             peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-primary"
        [class.requ]="required()"
        >{{ label() }}
      </label>

      <span class="cursor-pointer absolute inset-y-0 end-0 flex items-center pe-3.5 space-x-2">
        @if (value()) {
          <i class="bx bx-x cursor-pointer" (click)="clear()"></i>
        }

        <i
          [class]="show() ? 'bx bx-eye-slash' : 'bx bx-eye'"
          class="cursor-pointer"
          (click)="toggle()"
        ></i>
      </span>
    </div>
  `,
})
export class DaisyPasswordInput implements FormValueControl<string | null>, OnInit {
  value = model<string | null>(null);
  label = input<string>('');
  invalid = input<boolean>(false);
  required = input<boolean>(false);

  show = signal<boolean>(false);

  inputId: string = uuidv4();

  ngOnInit(): void {}

  toggle() {
    this.show.update((value) => !value);
  }

  clear() {
    this.value.set(null);
  }
}
