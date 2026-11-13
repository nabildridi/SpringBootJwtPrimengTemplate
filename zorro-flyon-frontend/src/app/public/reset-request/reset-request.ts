import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpTopics } from '../../enums/http-topics';
import { FormsModule } from '@angular/forms';
import { AppHttpService } from '../../services/http/app-http-service';
import { ToastService } from '../../services/toast/toast-service';
import { TuiInput } from '@taiga-ui/core';
import { AppLogo } from '../../layout/app.logo';
import { email, form, FormField, required } from '@angular/forms/signals';
import { TuiIcon } from '@taiga-ui/core';

export class PageObject {
  email!: string;
}

@Component({
  imports: [CommonModule, FormsModule, TuiInput, AppLogo, FormField, TuiIcon],
  selector: 'app-reset-request',
  styleUrl: './reset-request.css',
  templateUrl: './reset-request.html',
})
export class ResetRequest implements OnInit {
  pageModel = signal<PageObject>({
    email: '',
  });

  pageForm = form(this.pageModel, (path) => {
    required(path.email);
    email(path.email);
  });

  notFound: WritableSignal<boolean> = signal(false);

  constructor(
    private appHttpService: AppHttpService,
    private router: Router,
    private toastService: ToastService,
  ) {}

  ngOnInit() {}

  submitLogin(event: Event) {
    this.notFound.set(false);
    event.preventDefault();

    const payload = this.pageModel();

    this.appHttpService
      .topic(HttpTopics.Account)
      .add('requestReset')
      .post(payload)
      .subscribe({
        next: (result: any) => {
          this.toastService.showSuccess('Email de réinitialisation envoyé');
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          this.notFound.set(true);
        },
      });
  }
}
