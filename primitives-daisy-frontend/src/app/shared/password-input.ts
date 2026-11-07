import { Component, input, model, OnInit, Signal, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'n-password-input',
  imports: [],
  template: `
    <div class="join w-full">
      <div class="relative w-full join-item border-0">
        <input
          ngpInput
          class="peer m-0 block h-14 w-full rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-white dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
          [id]="inputId"
          [type]="show() ? 'text' : 'password'"
          [value]="value()"
          (input)="value.set($event.target.value)"
          [attr.data-invalid]="invalid() ? '' : null"
          [placeholder]="label()"
          autofocus
        />
        <label
          [for]="inputId"
          class="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
          [class.requ]="required()"
          >{{ label() }}</label
        >
      </div>

      <button type="button" class="btn btn-square btn-ghost join-item h-14" (click)="toggle()">
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
