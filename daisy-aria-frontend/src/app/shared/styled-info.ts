import { Component, input } from '@angular/core';

@Component({
  selector: 'daisy-styled-info',
  imports: [],
  template: `
    <div class="border-s-4 border-accent bg-primary p-2">
      <div class="flex items-center gap-2">
        @if (icon()) {
          <i [class]="'bx bx-' + icon()"></i>
        }
        <span class="text-sm">{{ label() }}</span>
      </div>
    </div>
  `,
})
export class DaisyStyledInfo {
  label = input.required<string>();
  icon = input<string | null>(null);
}
