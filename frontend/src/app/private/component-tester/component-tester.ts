import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast/toast.service';
import { AppHttpService } from '../../services/http/app-http.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { HttpTopics } from '../../enums/http-topics';

import { TuiIcon } from '@taiga-ui/core';

import { TuiInput } from '@taiga-ui/core';
import { TuiPassword } from '@taiga-ui/kit';
import { email, form, FormField, required } from '@angular/forms/signals';
import { PasswordGenerator } from '../../shared/password-generator/password-generator';
import { CountrySelect } from '../../shared/country.select';

import { TuiAccordion } from '@taiga-ui/kit';

interface LoginData {
  username: string;
  password: string;
  country: string;
}

@Component({
  imports: [
    TuiIcon,
    TuiInput,
    TuiPassword,
    FormField,
    PasswordGenerator,
    CountrySelect,
    TuiAccordion,
  ],
  selector: 'app-component-tester',
  styleUrl: './component-tester.css',
  templateUrl: './component-tester.html',
})
export class ComponentTester implements OnInit {
  loginModel = signal<LoginData>({
    username: '',
    password: '',
    country: '',
  });

  loginForm = form(this.loginModel, (fieldPath) => {
    required(fieldPath.username);
    email(fieldPath.username);
    required(fieldPath.password);
    required(fieldPath.country);
  });

  constructor(
    private appHttpService: AppHttpService,
    private router: Router,
    private toastService: ToastService,
    private storageService: StorageService,
  ) {}

  ngOnInit() {}

  submitLogin(event: Event) {
    event.preventDefault();
    // Perform login logic here
    const credentials = this.loginModel();

    console.log(credentials);
  }
}
