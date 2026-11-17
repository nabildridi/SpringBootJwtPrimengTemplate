import { Component, Input, model } from '@angular/core';

@Component({
  selector: 'n-collapse',
  imports: [],
  template: `
    <div class="collapse collapse-arrow bg-base-100 border border-base-300 shadow-lg">
      <input type="checkbox" checked="checked" />
      <div class="collapse-title font-semibold after:start-5 after:end-auto pe-4 ps-12">
        {{ title }}
      </div>
      <div class="collapse-content text-sm">
        <ng-content />
      </div>
    </div>
  `,
})
export class DaisyCollapse {
  @Input()
  title: string = '';
}
