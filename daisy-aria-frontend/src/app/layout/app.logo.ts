import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',

  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 28 28"
      fill="none"
    >
      <circle cx="14" cy="14" r="13" fill="#1E88E5" stroke="#1662a6" stroke-width="2" />
      <path d="M15.5 6 L9 15 H13.5 L12.5 22 L19 12.5 H14.5 Z" fill="#FFD600" />
    </svg>
  `,
})
export class AppLogo {}
