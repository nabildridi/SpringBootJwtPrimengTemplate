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

interface LoginData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [CommonModule, TuiIcon, TuiInput, TuiPassword, FormField],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  loginModel = signal<LoginData>({
    username: '',
    password: '',
  });

  loginForm = form(this.loginModel, (fieldPath) => {
    required(fieldPath.username, { message: 'Email is required' });
    email(fieldPath.username, { message: 'Enter a valid email address' });
    required(fieldPath.password, { message: 'password is required' });
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

    this.appHttpService
      .topic(HttpTopics.Token)
      .add('token')
      .post(credentials)
      .subscribe({
        next: (result: any) => {
          this.storageService.setAccessToken(result.token);
          this.storageService.setUsername(result.username);
          this.router.navigate(['/private']);
        },
        error: (error: any) => {
          this.toastService.showError('Invalid login/password');
        },
      });
  }
}
