import { Component, input, model, OnInit, Signal, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'n-password-input',
  imports: [],
  template: `
    <div class="relative w-full">
      <input
        ngpInput
        class="peer m-0 block h-14 w-full rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-white dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
        [id]="inputId"
        [type]="show() ? 'text' : 'password'"
        [value]="value()"
        (input)="value.set($event.target.value)"
        [attr.data-invalid]="invalid() ? '' : null"
        placeholder=" "
        autofocus
      />

      <label
        [for]="inputId"
        class="pointer-events-none absolute left-3 top-1.5 text-xs text-slate-500 dark:text-slate-400 transition-all duration-150
             peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
             peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400"
        [class.requ]="required()"
        >{{ label() }}
      </label>

      <button
        type="button"
        id="toggle"
        aria-label="Show password"
        (click)="toggle()"
        class="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        <i [class]="show() ? 'bx bx-eye-slash' : 'bx bx-eye'" class="cursor-pointer"></i>
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
