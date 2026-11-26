import { Component, input } from '@angular/core';

@Component({
  selector: 'n-styled-link',
  imports: [],
  template: `
    <a
      [href]="link()"
      class=" font-semibold text-info hover:text-primary transition-colors relative group"
    >
      {{ label() }}
      <span
        class="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-500"
      ></span>
    </a>
  `,
})
export class DaisyStyledLink {
  label = input.required<string>();
  link = input.required<string>();
}
