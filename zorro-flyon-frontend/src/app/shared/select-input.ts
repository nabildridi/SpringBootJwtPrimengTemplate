import { Component, input, model, OnInit, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { v4 as uuidv4 } from 'uuid';
import { environment } from '../../environments/environment';
import * as lod from 'lodash';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { ListsService } from '../services/configuration/lists-service';

@Component({
  selector: 'n-select-input',
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
        @for (option of itemsList(); track $index) {
          <nz-option nzCustomContent [nzLabel]="option.label" [nzValue]="option.value">
            {{ option.label }}
          </nz-option>
        }
      </nz-select>
    </label>
  `,
})
export class DaisySelectInput implements FormValueControl<string | null>, OnInit {
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
