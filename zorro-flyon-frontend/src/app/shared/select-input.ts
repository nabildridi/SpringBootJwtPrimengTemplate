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
        @for (option of originalList(); track $index) {
          <nz-option nzCustomContent [nzLabel]="option.label" [nzValue]="option.value">
            <i [class]="'z-0 fi fi-' + option.value"></i> {{ option.label }}
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

  originalList = signal<any[]>([]);
  filteredList = signal<any[]>([]);
  opened = signal<boolean>(false);
  selectedItem = signal<any>(null);
  term: string = '';

  constructor(private listsService: ListsService) {}

  ngOnInit(): void {
    if (this.listId() != null) {
      this.originalList.set(this.listsService.getList(this.listId()!));
    }
    if (this.listItems() != null) {
      this.originalList.set(this.listItems()!);
    }
    this.filteredList.set(this.originalList());
    this.selectedItem.set(lod.find(this.originalList(), { value: this.value() }));
  }

  filter() {
    if (this.term != null && this.term.length > 0) {
      this.search(this.term);
    } else {
      this.filteredList.set(this.originalList());
    }
  }

  search(toSearch: string) {
    this.filteredList.set(this.originalList());
    this.filteredList.set(
      lod.filter(this.originalList(), function (o) {
        return o.label.toLowerCase().includes(toSearch);
      }),
    );
  }

  selectItem(item: any) {
    this.selectedItem.set(item);
    this.value.set(item.value);
    this.opened.set(false);
  }

  reset() {
    this.selectedItem.set(null);
    this.value.set(null);
    this.opened.set(false);
  }

  resetSearch() {
    this.term = '';
    this.filteredList.set(this.originalList());
  }

  protected onZone(activeZoning: boolean): void {
    if (!activeZoning) {
      this.opened.set(false);
    }
  }

  toggle(event: Event) {
    this.opened.update((value) => !value);
  }
}
