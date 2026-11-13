import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpTopics } from '../../enums/http-topics';
import { TuiIcon } from '@taiga-ui/core';
import { TuiInput } from '@taiga-ui/core';
import { form, FormField, required } from '@angular/forms/signals';
import { AppHttpService } from '../../services/http/app-http-service';
import { ToastService } from '../../services/toast/toast-service';
import { AppLogo } from '../../layout/app.logo';
import { Profile } from '../../model/profile';
import { CountrySelect } from '../../shared/country.select';

export type TriState = boolean | null;

@Component({
  imports: [TuiIcon, TuiInput, FormField, AppLogo, CountrySelect],
  selector: 'app-confirm-account',
  styleUrl: './confirm-account.css',
  templateUrl: './confirm-account.html',
})
export class ConfirmAccount implements OnInit {
  response: WritableSignal<TriState> = signal(null);
  token!: string;

  pageModel = signal<Profile>({
    id: null,
    companyName: '',
    tel: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    createdAt: new Date(),
  });

  pageForm = form(this.pageModel, (path) => {
    required(path.companyName);
    required(path.address);
    required(path.city);
    required(path.zipCode);
    required(path.country);
    required(path.tel);
  });

  constructor(
    private appHttpService: AppHttpService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private router: Router,
  ) {}

  // http://localhost:4200/confirmed?token=a5cd7a79-bb7d-11f1-b875-8f645fb993bd

  ngOnInit() {
    this.token = this.activatedRoute.snapshot.queryParamMap.get('token') || '';

    this.verify();
  }

  verify() {
    this.appHttpService
      .topic(HttpTopics.Account)
      .add('confirm')
      .add(this.token)
      .get()
      .subscribe({
        next: (result: any) => {
          this.response.set(true);
        },
        error: (error: any) => {
          this.response.set(false);
        },
      });
  }

  resendConfirmationEmail() {
    this.appHttpService
      .topic(HttpTopics.Account)
      .add('resend')
      .add(this.token)
      .get()
      .subscribe({
        next: (result: any) => {
          this.router.navigate(['/']);
          this.toastService.showSuccess('Email de confirmation renvoyé');
        },
        error: (error: any) => {
          this.router.navigate(['/']);
          this.toastService.showError("Erreur d'envoi");
        },
      });
  }

  submitLogin(event: Event) {
    this.response.set(null);
    event.preventDefault();

    const payload = this.pageModel();

    this.appHttpService
      .topic(HttpTopics.Account)
      .add('saveProfile')
      .add(this.token)
      .post(payload)
      .subscribe({
        next: (result: any) => {
          this.router.navigate(['/login']);
          this.toastService.showSuccess('Profil sauvegardé');
        },
        error: (error: any) => {
          this.toastService.showError('Erreur de serveur');
        },
      });
  }
}
