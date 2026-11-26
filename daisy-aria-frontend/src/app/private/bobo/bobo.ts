import { Component, signal } from '@angular/core';
import { ToastService } from '../../services/toast/toast.service';
import { form, required, FormField } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { DaisyTextInput } from '../../shared/text-input';
import { DaisyPasswordInput } from '../../shared/password-input';
import { DaisyCountrySelectInput } from '../../shared/country-select-input';
import { DaisyFileInput } from '../../shared/file-input';
import { ForDialogManager } from 'forty-cdk/dialog';
import { ConfirmData } from '../../shared/confirm-dialog';
import { ConfirmService } from '../../services/confirm/confirm-service';
import { TestModal } from '../test-modal/test-modal';
import { DaisyPasswordGenerator } from '../../shared/password-generator';
import { DaisyMultiButtonSelector } from '../../shared/multi-button-selector';
import { environment } from '../../../environments/environment';
import { DaisyPickList } from '../../shared/pick-list';
import { DaisyImageCheckbox } from '../../shared/image-checkbox';

interface pageData {
  username: string;
  password: string;
  country: string;
  color: string;
  colors: string[];
  generated: string;
  logo: File | null;
  marque: boolean | null;
}

@Component({
  imports: [
    FormsModule,
    DaisyTextInput,
    FormField,
    DaisyPasswordInput,
    DaisyCountrySelectInput,
    DaisyFileInput,
    DaisyPasswordGenerator,
    DaisyPickList,
    DaisyImageCheckbox,
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
    colors: ['af', 'fr', 'br'],
    generated: '',
    logo: null,
    marque: null,
  });

  pageForm = form(this.pageModel, (fieldPath) => {
    required(fieldPath.username);
    required(fieldPath.password);
    required(fieldPath.country);
    //required(fieldPath.colors);
    //required(fieldPath.triholder);
    required(fieldPath.color);
    required(fieldPath.generated);
    required(fieldPath.marque);
  });

  countries: any[] = [];

  constructor(
    private toastService: ToastService,
    private confirmService: ConfirmService,
    private forDialogManager: ForDialogManager,
  ) {
    this.countries = environment.countries;
  }

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
    const ref = this.forDialogManager.open(TestModal, {
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
