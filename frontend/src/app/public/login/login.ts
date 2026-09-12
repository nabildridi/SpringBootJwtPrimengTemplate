import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast/toast.service';
import { AppHttpService } from '../../services/http/app-http.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { HttpTopics } from '../../enums/http-topics';
import { FormsModule } from '@angular/forms';
import { PanelModule } from '@openng/optimus-ui/panel';
import { ButtonModule } from '@openng/optimus-ui/button';
import { PasswordModule } from '@openng/optimus-ui/password';
import { InputTextModule } from '@openng/optimus-ui/inputtext';

export class LoginObject {
  username!: string;
  password!: string;
}

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, PanelModule, ButtonModule, PasswordModule, InputTextModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  loginObject: LoginObject = new LoginObject();

  constructor(
    private appHttpService: AppHttpService,
    private router: Router,
    private toastService: ToastService,
    private storageService: StorageService,
  ) {}

  ngOnInit() {}

  submitLogin() {
    this.appHttpService
      .topic(HttpTopics.Token)
      .add('token')
      .post(this.loginObject)
      .subscribe({
        next: (result: any) => {
          this.storageService.setAccessToken(result.token);
          this.storageService.setUsername(result.username);
          this.router.navigate(['/private/users']);
        },
        error: (error: any) => {
          this.toastService.showError('Invalid login/password');
        },
      });
  }
}
