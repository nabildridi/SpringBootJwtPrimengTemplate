import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { email, form, FormField, required } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { NgpButton } from 'ng-primitives/button';
import { CountrySelect } from './shared/country.select';
import { DaisyTextInput } from './shared/text-input';
import { DaisyPasswordInput } from './shared/password-input';
import { environment } from '../environments/environment';
import { DaisyTable } from './shared/custom-table';
import { AppHttpService } from './services/http/app-http.service';
import { HttpTopics } from './enums/http-topics';

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
    CountrySelect,
    DaisyTextInput,
    DaisyPasswordInput,
    DaisyTable,
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

  data = signal<any[]>([]);

  constructor(private appHttpService: AppHttpService) {}

  submitLogin(event: Event) {
    event.preventDefault();

    const credentials = this.loginModel();
    console.log(credentials);
  }

  loadFromServer() {
    //{"first":0,"rows":10,"sortOrder":1,"filters":{"name":{"value":null,"matchMode":"startsWith"},"country.name":{"value":null,"matchMode":"startsWith"},"company":{"value":null,"matchMode":"startsWith"},"representative":{"value":null,"matchMode":"in"}},"globalFilter":null}

    let event = {
      first: this.pageSignal() * this.sizeSignal(),
      rows: 5,
      sortOrder: 1,
      sortField: 'id',
      filters: this.serverFilters,
      globalFilter: ['id'],
    };

    this.appHttpService
      .topic(HttpTopics.Users)
      .add('paginate')
      .post(event)
      .subscribe({
        next: (json: any) => {
          if (json) {
            this.data.set(json['content']);
            this.totalSignal.set(json.totalElements);
          }
        },
        error: (e) => {},
      });
  }
}
