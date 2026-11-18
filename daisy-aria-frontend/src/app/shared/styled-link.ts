import { Component, Input } from '@angular/core';

@Component({
  selector: 'n-styled-link',
  imports: [],
  template: `
    <a
      [href]="link"
      class="text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors relative group"
    >
      {{ label }}
      <span
        class="absolute -bottom-0.5 left-0 w-0 h-px bg-orange-400 group-hover:w-full transition-all duration-300"
      ></span>
    </a>
  `,
})
export class DaisyStyledLink {
  @Input()
  label: string | undefined = '';

  @Input()
  link!: string;
}
