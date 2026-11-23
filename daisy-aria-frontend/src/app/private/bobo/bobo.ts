import { Component, signal } from '@angular/core';
import { ToastService } from '../../services/toast/toast.service';
import { form, required, FormField } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { DaisyTextInput } from '../../shared/text-input';
import { DaisyPasswordInput } from '../../shared/password-input';
import { DaisyCountrySelectInput } from '../../shared/country-select-input';
import { DaisyFileInput } from '../../shared/file-input';
import { ForDialogManager } from 'forty-cdk/dialog';
import { ConfirmData, ConfirmResult, DaisyConfirm } from '../../shared/confirm-dialog';
import { ConfirmService } from '../../services/confirm/confirm-service';
import { TestModal } from '../test-modal/test-modal';
import { Users } from '../users/users';

interface pageData {
  username: string;
  password: string;
  country: string;
  color: string;
  colors: string[];
  generated: string;
  logo: File | null;
}

@Component({
  imports: [
    FormsModule,
    DaisyTextInput,
    FormField,
    DaisyPasswordInput,
    DaisyCountrySelectInput,
    DaisyFileInput,
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
    generated: '',
    logo: null,
  });

  pageForm = form(this.pageModel, (fieldPath) => {
    required(fieldPath.username);
    required(fieldPath.password);
    required(fieldPath.country);
    //required(fieldPath.colors);
    //required(fieldPath.triholder);
    required(fieldPath.color);
    required(fieldPath.generated);
  });

  constructor(
    private toastService: ToastService,
    private confirmService: ConfirmService,
    private forDialogManager: ForDialogManager,
  ) {}

  showToast() {
    this.toastService.showSuccess('all ok');
  }

  submitLogin(event: Event) {
    event.preventDefault();
    const payload = this.pageModel();
    console.log(payload);
  }

  openConfirm() {
    let confirmTexts: ConfirmData = {
      title: 'Effacer compte?',
      message: 'cet action is permanent and cannot be undone.',
      confirmText: 'Confirmer',
      cancelText: 'Annuler',
    };

    this.confirmService.open(confirmTexts).subscribe({
      next: (result: any) => {
        if (result) {
          console.log(result);
        }
      },
    });
  }

  async openModal() {
    const ref = this.forDialogManager.open(Users, {
      data: {},
      modal: true,
      dismissible: false,
      class: 'programmatic-dialog programmatic-dialog--pop',
      animateLeave: 'programmatic-out',
      backdropAnimateLeave: 'programmatic-backdrop-out',
    });
    const { result } = await ref.closed; // result: 'confirm' | 'cancel' | undefined
  }
}
