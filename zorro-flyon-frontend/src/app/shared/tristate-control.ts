import { Component, input, model, output, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { v4 as uuidv4 } from 'uuid';
import { FormsModule } from '@angular/forms';

export type TriState = boolean | null;

@Component({
  imports: [FormsModule],
  selector: 'n-tristate',
  template: `
    <div class="join join-horizontal">
      <button
        type="button"
        class="btn join-item aria-pressed:bg-primary border border-base-300"
        [aria-pressed]="value() == true ? 'true' : 'false'"
        (click)="setValue(true)"
      >
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            [name]="inputName"
            class="appearance-none w-6 h-6 border-2 border-gray-400 rounded-full
             grid place-content-center
             before:content-[''] before:w-3 before:h-3 before:rounded-full
             before:scale-0 before:transition-transform before:duration-150
             before:bg-green-700
             checked:before:scale-100 checked:border-green-700
             focus:outline-2 focus:outline-green-700 focus:outline-offset-2"
          />
          {{ trueLabel() }}
        </label>
      </button>
      <button
        type="button"
        class="btn join-item aria-pressed:bg-primary border border-base-300"
        [aria-pressed]="value() == false ? 'true' : 'false'"
        (click)="setValue(false)"
      >
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            [name]="inputName"
            class="appearance-none w-6 h-6 border-2 border-gray-400 rounded-full
             grid place-content-center
             before:content-[''] before:w-3 before:h-3 before:rounded-full
             before:scale-0 before:transition-transform before:duration-150
             before:bg-green-700
             checked:before:scale-100 checked:border-green-700
             focus:outline-2 focus:outline-green-700 focus:outline-offset-2"
          />
          {{ falseLabel() }}
        </label>
      </button>

      <button
        type="button"
        class="btn join-item aria-pressed:bg-primary border border-base-300"
        [aria-pressed]="value() == null ? 'true' : 'false'"
        (click)="setValue(null)"
      >
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            [name]="inputName"
            class="appearance-none w-6 h-6 border-2 border-gray-400 rounded-full
             grid place-content-center
             before:content-[''] before:w-3 before:h-3 before:rounded-full
             before:scale-0 before:transition-transform before:duration-150
             before:bg-green-700
             checked:before:scale-100 checked:border-green-700
             focus:outline-2 focus:outline-green-700 focus:outline-offset-2"
          />
          {{ nullLabel() }}
        </label>
      </button>
    </div>
  `,
})
export class DaisyTristate implements FormValueControl<TriState> {
  value = model<TriState>(null);
  trueLabel = input.required<string>();
  falseLabel = input.required<string>();
  nullLabel = input.required<string>();

  inputName: string = uuidv4();

  setValue(value: TriState) {
    this.value.update((item: TriState) => (item = value));
  }
}
