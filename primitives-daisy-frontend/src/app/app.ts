import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { email, form, FormField, required } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { NgpButton } from 'ng-primitives/button';
import { NgpInput } from 'ng-primitives/input';
import { CountrySelect } from './shared/country.select';
import { NgpPassword, NgpPasswordInput, NgpPasswordToggle } from 'ng-primitives/password';

export class LoginObject {
  username!: string;
  password!: string;
  country!: string;
}

@Component({
  imports: [
    RouterOutlet,
    FormField,
    FormsModule,
    NgpButton,
    NgpInput,
    CountrySelect,
    NgpPassword,
    NgpPasswordInput,
    NgpPasswordToggle,
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
  styles: `
    :host {
      display: contents;
    }
  `,
})
export class App {
  loginModel = signal<LoginObject>({
    username: '',
    password: '',
    country: '',
  });

  loginForm = form(this.loginModel, (path) => {
    required(path.username);
    email(path.username);
    required(path.password);
    required(path.country);
  });

  submitLogin(event: Event) {
    event.preventDefault();

    const credentials = this.loginModel();
    console.log(credentials);
  }
}
