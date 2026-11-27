import { Component, input } from '@angular/core';

@Component({
  selector: 'daisy-styled-info',
  imports: [],
  template: `
    <div class="border-s-6 border-accent border-t-2 border-b-2 border-r-2 p-2 bg-base-100">
      <div class="flex items-center   gap-2">
        @if (icon()) {
          <i [class]="'bx bx-' + icon()"></i>
        }
        <span class="text-sm text-black dark:text-white">{{ label() }}</span>
      </div>
    </div>
  `,
})
export class DaisyStyledInfo {
  label = input.required<string>();
  icon = input<string | null>(null);
}
