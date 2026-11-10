import { Component, signal } from '@angular/core';
import { CountrySelect } from '../../shared/country.select';
import { form, required, FormField } from '@angular/forms/signals';
import { DaisyTextInput } from '../../shared/text-input';
import { DaisyPasswordInput } from '../../shared/password-input';
import { NgpButton } from 'ng-primitives/button';
import { DaisySelectInput } from '../../shared/select-input';

interface LoginData {
  username: string;
  password: string;
}

@Component({
  imports: [DaisyTextInput, DaisyPasswordInput, FormField, NgpButton, DaisySelectInput],
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
}
