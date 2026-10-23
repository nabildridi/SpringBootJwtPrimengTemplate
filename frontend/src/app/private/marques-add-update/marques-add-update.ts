import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Marque } from '../../model/marque';
import { FormsModule } from '@angular/forms';
import { CountrySelect } from '../../shared/country.select';
import { HttpTopics } from '../../enums/http-topics';
import { email, form, required, FormField } from '@angular/forms/signals';
import { AppHttpService } from '../../services/http/app-http.service';
import { ToastService } from '../../services/toast/toast.service';
import { TuiAccordion } from '@taiga-ui/kit';
import { TuiInput, TuiButton } from '@taiga-ui/core';
import { TuiLabel } from '@taiga-ui/core';
import { TuiSwitch } from '@taiga-ui/kit';
import { TuiFiles } from '@taiga-ui/kit';

import { TuiPreview } from '@taiga-ui/kit';
import { QuillModule } from 'ngx-quill';

@Component({
  imports: [
    FormsModule,
    RouterModule,
    CountrySelect,
    TuiAccordion,
    TuiInput,
    FormField,
    TuiLabel,
    TuiSwitch,
    TuiFiles,
    TuiPreview,
    TuiButton,
    QuillModule,
  ],
  selector: 'app-marques-add-update',
  styleUrl: './marques-add-update.css',
  templateUrl: './marques-add-update.html',
})
export class MarquesAddUpdate implements OnInit {
  previewOpened = signal<boolean>(false);

  formObject: Marque = {
    id: null,
    profileId: '',
    name: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    site: '',
    presentation: '',
    originalLogo: '',
    resizedLogo:
      'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=',
    showLogoFiche: false,
  };

  logoImage: File | null = null;

  pageModel = signal<Marque>(this.formObject);

  pageForm = form(this.pageModel, (path) => {
    required(path.name);
    required(path.address);
    required(path.city);
    required(path.zipCode);
    required(path.country);
    required(path.site);
  });

  constructor(
    private appHttpService: AppHttpService,
    private router: Router,
    private toastService: ToastService,
  ) {
    //get data
  }

  ngOnInit() {}

  togglePreview() {
    this.previewOpened.update((value) => !value);
  }

  removeFile(): void {
    this.logoImage = null;
  }

  submitData(event: Event) {
    let formData = new FormData();

    const payload = this.pageModel();

    console.log(this.pageModel().presentation);

    if (this.logoImage) {
      formData.append('logoImage', this.logoImage, this.logoImage.name);
    } else {
      formData.append('logoImage', new Blob(), undefined);
    }

    // add the data object
    formData.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
  }

  deleteLogo() {
    this.pageModel().resizedLogo = '';
    this.pageModel().originalLogo = '';
  }
}
