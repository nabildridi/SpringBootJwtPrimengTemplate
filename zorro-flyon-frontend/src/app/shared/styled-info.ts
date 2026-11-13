import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-styled-info',
  imports: [],
  template: `
    <div class="border-s-4 border-blue-700 bg-amber-200 dark:bg-amber-900 p-2">
      <div class="flex items-center gap-2">
        @if (icon) {
          <i [class]="icon"></i>
        }
        <span class="text-sm">{{ label }}</span>
      </div>
    </div>
  `,
})
export class StyledInfo {
  @Input()
  label: string | undefined = '';

  @Input()
  icon!: string;
}
