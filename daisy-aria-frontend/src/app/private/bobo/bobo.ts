import { Component, signal } from '@angular/core';
import { ToastService } from '../../services/toast/toast.service';
import { form, required, FormField } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { DaisyTextInput } from '../../shared/text-input';
import { DaisyPasswordInput } from '../../shared/password-input';
import { DaisyCountrySelectInput } from '../../shared/country-select-input';

interface pageData {
  username: string;
  password: string;
  country: string;
  color: string;
  colors: string[];
  generated: string;
}

@Component({
  imports: [FormsModule, DaisyTextInput, FormField, DaisyPasswordInput, DaisyCountrySelectInput],
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

  constructor(private toastService: ToastService) {}

  showToast() {
    this.toastService.showSuccess('all ok');
  }

  submitLogin(event: Event) {
    event.preventDefault();
    const payload = this.pageModel();
    console.log(payload);
  }
}
