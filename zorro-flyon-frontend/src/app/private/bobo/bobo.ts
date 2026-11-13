import { Component, signal } from '@angular/core';
import { form, required, FormField } from '@angular/forms/signals';
import { DaisyTextInput } from '../../shared/text-input';
import { DaisyPasswordInput } from '../../shared/password-input';
import { DaisySelectInput } from '../../shared/select-input';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ReceiveSendModal } from '../../modals/receive-send-modal/receive-send-modal';
import { FormsModule } from '@angular/forms';
import { DaisyCountrySelectInput } from '../../shared/country-select-input';
import { environment } from '../../../environments/environment';
import { DaisyMultiButtonSelector } from '../../shared/multi-button-selector';
import { DaisyTristate } from '../../shared/tristate-control';

export type TriState = boolean | null;

interface pageData {
  username: string;
  password: string;
  country: string;
  color: string;
  colors: string[];
  triholder: TriState;
}

@Component({
  imports: [
    FormsModule,
    DaisyTextInput,
    DaisyPasswordInput,
    FormField,
    DaisySelectInput,
    NzCollapseModule,
    NzModalModule,
    DaisyCountrySelectInput,
    DaisyMultiButtonSelector,
    DaisyTristate,
  ],
  selector: 'app-bobo',
  styleUrl: './bobo.css',
  templateUrl: './bobo.html',
})
export class Bobo {
  pageModel = signal<pageData>({
    username: '',
    password: '',
    country: 'br',
    color: 'val5',
    colors: [],
    triholder: null,
  });

  pageForm = form(this.pageModel, (fieldPath) => {
    required(fieldPath.username);
    required(fieldPath.password);
    required(fieldPath.country);
    //required(fieldPath.colors);
    //required(fieldPath.triholder);
    required(fieldPath.color);
  });

  availableColors: any[] = [];

  constructor(private nzModalService: NzModalService) {
    this.availableColors = environment.colors;
  }

  openModal() {
    this.nzModalService.create({
      nzTitle: 'Modal Title',
      nzContent: ReceiveSendModal,
      nzFooter: null,
      nzData: {
        text: 'Nabil Dridi',
      },
    });
  }

  submitLogin(event: Event) {
    event.preventDefault();
    const payload = this.pageModel();
    console.log(payload);
  }
}
