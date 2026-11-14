import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpTopics } from '../../enums/http-topics';
import { FormsModule } from '@angular/forms';
import { AppLogo } from '../../layout/app.logo';
import { form, FormField, required } from '@angular/forms/signals';
import { AppHttpService } from '../../services/http/app-http.service';
import { ToastService } from '../../services/toast/toast.service';
import { DaisyPasswordGenerator } from '../../shared/password-generator';

export class PageObject {
  newPassword!: string;
}

@Component({
  imports: [CommonModule, FormsModule, AppLogo, FormField, DaisyPasswordGenerator],
  selector: 'app-write-new-password',
  styleUrl: './write-new-password.css',
  templateUrl: './write-new-password.html',
})
export class WriteNewPassword implements OnInit {
  expired: WritableSignal<boolean> = signal(false);
  pageModel = signal<PageObject>({
    newPassword: '',
  });
  token!: string;

  pageForm = form(this.pageModel, (path) => {
    required(path.newPassword);
  });

  constructor(
    private appHttpService: AppHttpService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private router: Router,
  ) {}

  // http://localhost:4200/setResetPassword?token=35d18b1f-bba4-11f1-8d06-31b5593b90a4

  ngOnInit() {
    this.token = this.activatedRoute.snapshot.queryParamMap.get('token') || '';

    this.verify();
  }

  verify() {
    this.appHttpService
      .topic(HttpTopics.Account)
      .add('verify')
      .add(this.token)
      .get()
      .subscribe({
        next: (result: any) => {
          this.expired.set(false);
        },
        error: (error: any) => {
          this.expired.set(true);
        },
      });
  }

  submitLogin(event: Event) {
    this.expired.set(false);
    event.preventDefault();

    this.appHttpService
      .topic(HttpTopics.Account)
      .add('setNewPassword')
      .add(this.token)
      .post(this.pageModel().newPassword)
      .subscribe({
        next: (result: any) => {
          this.router.navigate(['/login']);
          this.toastService.showSuccess('Mot de passe changée');
        },
        error: (error: any) => {
          this.toastService.showError('Erreur de serveur');
        },
      });
  }
}
