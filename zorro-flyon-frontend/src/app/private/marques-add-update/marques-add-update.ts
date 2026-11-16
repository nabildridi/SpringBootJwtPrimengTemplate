import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Marque } from '../../model/marque';
import { FormsModule } from '@angular/forms';
import { HttpTopics } from '../../enums/http-topics';
import { email, form, required, FormField } from '@angular/forms/signals';
import { DaisyCountrySelectInput } from '../../shared/country-select-input';
import { DaisyTextInput } from '../../shared/text-input';
import { AppHttpService } from '../../services/http/app-http.service';
import { ToastService } from '../../services/toast/toast.service';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzImageService } from 'ng-zorro-antd/image';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { QuillModule } from 'ngx-quill';

@Component({
  imports: [
    FormsModule,
    RouterModule,
    DaisyCountrySelectInput,
    FormField,
    DaisyTextInput,
    NzCollapseModule,
    NzUploadModule,
    NzCheckboxModule,
    QuillModule,
  ],
  selector: 'app-marques-add-update',
  styleUrl: './marques-add-update.css',
  templateUrl: './marques-add-update.html',
  providers: [],
})
export class MarquesAddUpdate implements OnInit {
  readonly fileList = signal<NzUploadFile[]>([]);

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
    resizedLogo: '',
    showLogoFiche: false,
    createdAt: new Date(),
  };

  logoImage: File | null = null;

  pageModel = signal<Marque>(this.formObject);
  pageForm: any;

  constructor(
    private appHttpService: AppHttpService,
    private router: Router,
    private toastService: ToastService,
  ) {
    //get data
    const currentState = this.router.currentNavigation();

    if (currentState) {
      this.formObject = currentState?.extras?.state?.['marque'];
      if (!this.formObject) this.router.navigate(['/private/marques']);

      this.pageModel = signal<Marque>(this.formObject);

      this.pageForm = form(this.pageModel, (path) => {
        required(path.name);
        required(path.address);
        required(path.city);
        required(path.zipCode);
        required(path.country);
        required(path.site);
      });
    } else {
      this.router.navigate(['/private/marques']);
    }
  }

  ngOnInit() {}

  removeFile = (file: NzUploadFile): boolean => {
    this.fileList.set([]);
    this.logoImage = null;
    return false;
  };

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList.set([]);
    this.fileList.update((fileList) => fileList.concat(file));
    this.handleUpload();
    return false;
  };

  handleUpload() {
    this.fileList().forEach((file: any) => {
      this.logoImage = file;
    });
  }

  submitData(event: Event) {
    const payload = this.pageModel();

    let formData = new FormData();

    if (this.logoImage) {
      formData.append('logoImage', this.logoImage, this.logoImage.name);
    } else {
      formData.append('logoImage', new Blob(), undefined);
    }

    // add the data object
    formData.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }));

    this.appHttpService
      .topic(HttpTopics.Marques)
      .put(formData)
      .subscribe({
        next: (result: boolean) => {
          this.toastService.showSuccess('Marque Ajoutée/Editée');
          this.router.navigate(['/private/marques']);
        },
        error: (error: any) => {
          this.toastService.showError('Erreur serveur');
        },
      });
  }

  deleteLogo() {
    this.formObject!.resizedLogo = null;
    this.formObject!.originalLogo = null;
  }

  showPreview() {}
}
