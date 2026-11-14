import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpTopics } from '../../enums/http-topics';
import { email, form, FormField, required } from '@angular/forms/signals';
import { AppLogo } from '../../layout/app.logo';
import { User } from '../../model/user';
import { DaisyTextInput } from '../../shared/text-input';
import { DaisyPasswordGenerator } from '../../shared/password-generator';
import { AppHttpService } from '../../services/http/app-http.service';
import { ToastService } from '../../services/toast/toast.service';

export type TriState = boolean | null;

@Component({
  imports: [FormField, AppLogo, DaisyTextInput, DaisyPasswordGenerator],
  selector: 'app-registration',
  styleUrl: './registration.css',
  templateUrl: './registration.html',
})
export class Registration implements OnInit {
  response: WritableSignal<TriState> = signal(null);

  pageModel = signal<User>({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    id: null,
    profileId: '',
    role: null,
    createdAt: new Date(),
    verified: false,
  });

  pageForm = form(this.pageModel, (path) => {
    required(path.email);
    email(path.email);
    required(path.password);
    required(path.firstname);
    required(path.lastname);
  });

  constructor(
    private appHttpService: AppHttpService,
    private router: Router,
    private toastService: ToastService,
  ) {}

  ngOnInit() {}

  submitLogin(event: Event) {
    this.response.set(null);
    event.preventDefault();

    const payload = this.pageModel();

    this.appHttpService
      .topic(HttpTopics.Account)
      .add('create')
      .post(payload)
      .subscribe({
        next: (result: any) => {
          this.router.navigate(['/']);
          this.toastService.showSuccess(
            "Un email de confirmation vient d'être envoyé. Merci de bien vouloir vérifier votre boîte mail (pensez à regarder dans vos courriers indésirables si besoin)",
          );
        },
        error: (error: any) => {
          this.response.set(false);
        },
      });
  }
}
