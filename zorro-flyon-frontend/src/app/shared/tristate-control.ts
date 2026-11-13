import { Component, input, model, output, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'n-tristate',
  template: `
    <div
      class="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-900/10 sm:p-8"
    >
      <fieldset>
        <legend class="text-lg font-semibold tracking-tight text-stone-900">Pickup slot</legend>
        <p class="mt-1 text-sm text-stone-600">Collect from Harbour Street, Saturday.</p>
        <div class="mt-5 grid gap-3 sm:grid-cols-2">
          <label
            class="flex cursor-pointer items-center gap-3 rounded-lg border border-stone-200 px-4 py-3 text-sm text-stone-800 has-checked:border-teal-700 has-checked:bg-teal-50 has-disabled:cursor-not-allowed has-disabled:bg-stone-50 has-disabled:text-stone-500"
          >
            <input
              type="radio"
              name="trb-cd-slot"
              value="9"
              class="grid size-5 shrink-0 cursor-pointer appearance-none place-content-center rounded-full border-2 border-stone-500 bg-white before:size-2 before:scale-0 before:rounded-full before:bg-white checked:border-teal-700 checked:bg-teal-700 checked:before:scale-100 hover:border-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:border-stone-300 disabled:bg-stone-100 motion-safe:before:transition-transform forced-colors:appearance-auto forced-colors:before:hidden"
            />
            9 to 11 am
          </label>
          <label
            class="flex cursor-pointer items-center gap-3 rounded-lg border border-stone-200 px-4 py-3 text-sm text-stone-800 has-checked:border-teal-700 has-checked:bg-teal-50 has-disabled:cursor-not-allowed has-disabled:bg-stone-50 has-disabled:text-stone-500"
          >
            <input
              type="radio"
              name="trb-cd-slot"
              value="11"
              checked
              class="grid size-5 shrink-0 cursor-pointer appearance-none place-content-center rounded-full border-2 border-stone-500 bg-white before:size-2 before:scale-0 before:rounded-full before:bg-white checked:border-teal-700 checked:bg-teal-700 checked:before:scale-100 hover:border-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:border-stone-300 disabled:bg-stone-100 motion-safe:before:transition-transform forced-colors:appearance-auto forced-colors:before:hidden"
            />
            11 am to 1 pm
          </label>
          <label
            class="flex cursor-pointer items-center gap-3 rounded-lg border border-stone-200 px-4 py-3 text-sm text-stone-800 has-checked:border-teal-700 has-checked:bg-teal-50 has-disabled:cursor-not-allowed has-disabled:bg-stone-50 has-disabled:text-stone-500"
          >
            <input
              type="radio"
              name="trb-cd-slot"
              value="14"
              class="grid size-5 shrink-0 cursor-pointer appearance-none place-content-center rounded-full border-2 border-stone-500 bg-white before:size-2 before:scale-0 before:rounded-full before:bg-white checked:border-teal-700 checked:bg-teal-700 checked:before:scale-100 hover:border-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:border-stone-300 disabled:bg-stone-100 motion-safe:before:transition-transform forced-colors:appearance-auto forced-colors:before:hidden"
            />
            2 to 4 pm
          </label>
          <label
            class="flex cursor-pointer items-center gap-3 rounded-lg border border-stone-200 px-4 py-3 text-sm text-stone-800 has-checked:border-teal-700 has-checked:bg-teal-50 has-disabled:cursor-not-allowed has-disabled:bg-stone-50 has-disabled:text-stone-500"
          >
            <input
              type="radio"
              name="trb-cd-slot"
              value="16"
              disabled
              class="grid size-5 shrink-0 cursor-pointer appearance-none place-content-center rounded-full border-2 border-stone-500 bg-white before:size-2 before:scale-0 before:rounded-full before:bg-white checked:border-teal-700 checked:bg-teal-700 checked:before:scale-100 hover:border-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:border-stone-300 disabled:bg-stone-100 motion-safe:before:transition-transform forced-colors:appearance-auto forced-colors:before:hidden"
            />
            4 to 6 pm
            <span
              class="ml-auto rounded-full bg-stone-200 px-2 py-0.5 text-xs font-medium text-stone-700"
              >Full</span
            >
          </label>
        </div>
      </fieldset>
      <div class="mt-7 grid gap-6 border-t border-stone-200 pt-6 md:grid-cols-2">
        <fieldset>
          <legend class="text-sm font-semibold text-stone-900">Three sizes</legend>
          <div class="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
            <label class="flex cursor-pointer items-center gap-2 text-xs text-stone-700"
              ><input
                type="radio"
                name="trb-cd-size"
                value="sm"
                class="grid size-4 cursor-pointer appearance-none place-content-center rounded-full border-2 border-stone-500 bg-white before:size-1.5 before:scale-0 before:rounded-full before:bg-white checked:border-teal-700 checked:bg-teal-700 checked:before:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 motion-safe:before:transition-transform forced-colors:appearance-auto forced-colors:before:hidden"
              />
              Small</label
            >
            <label class="flex cursor-pointer items-center gap-2.5 text-sm text-stone-700"
              ><input
                type="radio"
                name="trb-cd-size"
                value="md"
                checked
                class="grid size-5 cursor-pointer appearance-none place-content-center rounded-full border-2 border-stone-500 bg-white before:size-2 before:scale-0 before:rounded-full before:bg-white checked:border-teal-700 checked:bg-teal-700 checked:before:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 motion-safe:before:transition-transform forced-colors:appearance-auto forced-colors:before:hidden"
              />
              Medium</label
            >
            <label class="flex cursor-pointer items-center gap-3 text-base text-stone-700"
              ><input
                type="radio"
                name="trb-cd-size"
                value="lg"
                class="grid size-6 cursor-pointer appearance-none place-content-center rounded-full border-2 border-stone-500 bg-white before:size-2.5 before:scale-0 before:rounded-full before:bg-white checked:border-teal-700 checked:bg-teal-700 checked:before:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 motion-safe:before:transition-transform forced-colors:appearance-auto forced-colors:before:hidden"
              />
              Large</label
            >
          </div>
        </fieldset>
        <fieldset>
          <legend class="text-sm font-semibold text-stone-900">Thick border, no dot</legend>
          <div class="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
            <label class="flex cursor-pointer items-center gap-2.5 text-sm text-stone-700"
              ><input
                type="radio"
                name="trb-cd-ring"
                value="paper"
                checked
                class="size-5 cursor-pointer appearance-none rounded-full border-2 border-stone-500 bg-white checked:border-[6px] checked:border-rose-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700 motion-safe:transition-[border-width] forced-colors:appearance-auto"
              />
              Paper bag</label
            >
            <label class="flex cursor-pointer items-center gap-2.5 text-sm text-stone-700"
              ><input
                type="radio"
                name="trb-cd-ring"
                value="none"
                class="size-5 cursor-pointer appearance-none rounded-full border-2 border-stone-500 bg-white checked:border-[6px] checked:border-rose-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700 motion-safe:transition-[border-width] forced-colors:appearance-auto"
              />
              No bag</label
            >
          </div>
        </fieldset>
      </div>
    </div>
  `,
})
export class DaisyTristate implements FormValueControl<string | null> {
  label = input<string>('');
  value = model<string | null>(null);
  invalid = input<boolean>(false);
  touched = input<boolean>(false);
  touch = output<void>();

  generatorFlag = signal<boolean>(false);
  passwordLength: number = 12;

  toggle() {
    this.generatorFlag.update((value) => !value);
  }

  generate() {
    var char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var password = '';
    for (var i = 0; i < this.passwordLength; i++) {
      var ind = Math.floor(Math.random() * char.length);
      password += char[ind];
    }
    this.value.set(password);
  }
}
