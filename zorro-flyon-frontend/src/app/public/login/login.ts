import { Component, OnInit, signal } from '@angular/core';
import { AppHttpService } from '../../services/http/app-http.service';
import { Router } from '@angular/router';
import { HttpTopics } from '../../enums/http-topics';

import { email, form, FormField, required } from '@angular/forms/signals';
import { DaisyTextInput } from '../../shared/text-input';
import { DaisyPasswordInput } from '../../shared/password-input';
import { ToastService } from '../../services/toast/toast.service';
import { AppLogo } from '../../layout/app.logo';
import { DaisyStyledLink } from '../../shared/styled-link';
import { StorageService } from '../../services/storage/storage-service';

interface LoginData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [DaisyTextInput, DaisyPasswordInput, FormField, AppLogo, DaisyStyledLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
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
      .topic(HttpTopics.Auth)
      .add('token')
      .post(credentials)
      .subscribe({
        next: (result: any) => {
          this.storageService.setAccessToken(result.token);
          this.storageService.setUserId(result.userId);
          if (result.profileId) this.storageService.setProfileId(result.profileId);
          this.storageService.setRole(result.role);
          this.router.navigate(['/private']);
        },
        error: (error: any) => {},
      });
  }
}
