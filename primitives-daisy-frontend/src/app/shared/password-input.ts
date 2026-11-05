import { Component, input, model, OnInit, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { NgpPassword, NgpPasswordInput, NgpPasswordToggle } from 'ng-primitives/password';

@Component({
  selector: 'n-password-input',
  imports: [NgpPassword, NgpPasswordInput, NgpPasswordToggle],
  template: `
    <label class="floating-label">
      <span [class.requ]="required()">{{ label() }}</span>

      <div class="relative w-full" #password="ngpPassword" ngpPassword>
        <input
          class="h-[2.125rem] w-full rounded-lg border-none bg-white px-3 pr-10 text-sm tracking-[-0.006em] text-zinc-950 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_0_0_1px_rgba(0,0,0,0.1)] outline-none placeholder:text-zinc-400 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500 dark:bg-zinc-950 dark:text-white dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.1)] dark:data-[focus]:outline-blue-400"
          ngpPasswordInput
          type="password"
          [placeholder]="label()"
          autocomplete="current-password"
          [value]="value()"
          (input)="value.set($event.target.value)"
          class="input w-full"
          [attr.data-invalid]="invalid() ? '' : null"
        />
        <button
          class="absolute top-0 right-0 flex h-[2.125rem] w-[2.125rem] cursor-pointer items-center justify-center rounded-lg border-none bg-transparent text-lg text-zinc-500 transition-colors duration-150 outline-none data-[focus-visible]:outline-2 data-[focus-visible]:-outline-offset-2 data-[focus-visible]:outline-blue-500 data-[hover]:text-zinc-700 data-[visible]:text-[#f01e2b] dark:data-[focus-visible]:outline-blue-400 dark:data-[hover]:text-zinc-300 dark:data-[visible]:text-[#ff4651]"
          ngpButton
          ngpPasswordToggle
          ngpPasswordToggleShownAnnouncement=""
          ngpPasswordToggleHiddenAnnouncement=""
        >
          <i
            [class]="password.isVisible() ? 'bx bx-eye-slash' : 'bx bx-eye'"
            class="cursor-pointer"
          ></i>
        </button>
      </div>
    </label>
  `,
})
export class DaisyPasswordInput implements FormValueControl<string | null>, OnInit {
  value = model<string | null>(null);
  label = input<string>('');
  invalid = input<boolean>(false);
  required = input<boolean>(false);
  type = input<string>('text');

  ngOnInit(): void {}
}
