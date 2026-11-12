import { Component, signal } from '@angular/core';
import { form, required, FormField } from '@angular/forms/signals';
import { DaisyTextInput } from '../../shared/text-input';
import { DaisyPasswordInput } from '../../shared/password-input';
import { DaisySelectInput } from '../../shared/select-input';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ReceiveSendModal } from '../../modals/receive-send-modal/receive-send-modal';

interface LoginData {
  username: string;
  password: string;
}

@Component({
  imports: [
    DaisyTextInput,
    DaisyPasswordInput,
    FormField,
    DaisySelectInput,
    NzCollapseModule,
    NzModalModule,
  ],
  selector: 'app-bobo',
  styleUrl: './bobo.css',
  templateUrl: './bobo.html',
})
export class Bobo {
  loginModel = signal<LoginData>({
    username: 'fr',
    password: '',
  });

  loginForm = form(this.loginModel, (fieldPath) => {
    required(fieldPath.username);
    required(fieldPath.password);
  });

  constructor(private nzModalService: NzModalService) {}

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
}
