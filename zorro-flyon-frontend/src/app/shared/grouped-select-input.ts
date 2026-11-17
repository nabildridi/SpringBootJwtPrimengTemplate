import { Component, input, model, OnInit, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { ListsService } from '../services/configuration/lists-service';

@Component({
  selector: 'n-grouped-select',
  imports: [NzSelectModule, FormsModule],
  template: `
    <label class="floating-label">
      <span [class.requ]="required()">{{ label() }}</span>
      <nz-select
        nzShowSearch
        nzAllowClear
        nzPlaceHolder=" "
        class="w-full"
        [nzStatus]="invalid() ? 'error' : ''"
        (nzOnClear)="reset()"
        [(ngModel)]="value"
        nzSize="large"
      >
        @for (group of itemsList(); track $index) {
          <nz-option-group [nzLabel]="group.label">
            @for (option of group.items; track $index) {
              <nz-option nzCustomContent [nzLabel]="option.label" [nzValue]="option.value">
                {{ option.label }}
              </nz-option>
            }
          </nz-option-group>
        }
      </nz-select>
    </label>
  `,
})
export class DaisyGroupedSelect implements FormValueControl<string | null>, OnInit {
  value = model<string | null>(null);
  label = input<string>('');
  listId = input<string | null>(null);
  listItems = input<any[] | null>(null);
  invalid = input<boolean>(false);
  required = input<boolean>(false);

  itemsList = signal<any[]>([]);

  constructor(private listsService: ListsService) {}

  ngOnInit(): void {
    if (this.listId() != null) {
      this.itemsList.set(this.listsService.getList(this.listId()!));
    }
    if (this.listItems() != null) {
      this.itemsList.set(this.listItems()!);
    }
  }

  reset() {
    this.value.set(null);
  }
}
