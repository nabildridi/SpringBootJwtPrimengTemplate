import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Produit, ProduitObject } from '../../model/produit';
import { email, FieldTree, form, min, required } from '@angular/forms/signals';
import { ProductStepTwo } from '../product-steps/product-step-two/product-step-two';
import { Router } from '@angular/router';
import { HttpTopics } from '../../enums/http-topics';
import { AppHttpService } from '../../services/http/app-http.service';
import { ToastService } from '../../services/toast/toast.service';
import { ProductStepOne } from '../product-steps/product-step-one/product-step-one';

@Component({
  imports: [ProductStepOne, ProductStepTwo],
  selector: 'app-products-add-update',
  styleUrl: './products-add-update.css',
  templateUrl: './products-add-update.html',
})
export class ProductsAddUpdate implements OnInit {
  stepNumber = signal<number>(1);

  stepNumber3Valid = signal<boolean>(false);
  stepNumber4Valid = signal<boolean>(false);

  pageModel!: WritableSignal<Produit>;
  stepOneForm!: FieldTree<Produit>;
  stepTwoForm!: FieldTree<Produit>;

  photoProduit = signal<File | null>(null);

  constructor(
    private appHttpService: AppHttpService,
    private router: Router,
    private toastService: ToastService,
  ) {
    //get data
    const currentState = this.router.currentNavigation();

    if (currentState) {
      let formObject = currentState?.extras?.state?.['produit'];
      if (!formObject) {
        this.router.navigate(['/private/produits']);
      } else {
        this.pageModel = signal<Produit>(formObject);

        this.stepOneForm = form(this.pageModel, (fieldPath) => {
          required(fieldPath.nom);
          required(fieldPath.marqueId);
          required(fieldPath.paysProd);
          required(fieldPath.prodNature);
        });

        this.stepTwoForm = form(this.pageModel, (fieldPath) => {
          required(fieldPath.alcoometrique);
          required(fieldPath.glucose);
          required(fieldPath.energeticValueKcal);
          required(fieldPath.energeticValueKj);
        });
      }
    } else {
      this.router.navigate(['/private/produits']);
    }
  }

  ngOnInit(): void {}

  goTo(step: number) {
    this.stepNumber.set(step);
  }

  submitData(event: Event) {
    event.preventDefault();

    // Perform login logic here
    const payload = this.pageModel();
    console.log(payload);

    let formData = new FormData();

    if (this.photoProduit() != null) {
      formData.append('photoProduit', this.photoProduit()!, this.photoProduit.name);
    } else {
      formData.append('photoProduit', new Blob(), undefined);
    }

    // add the data object
    formData.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }));

    this.appHttpService
      .topic(HttpTopics.Produits)
      .put(formData)
      .subscribe({
        next: (result: boolean) => {
          this.toastService.showSuccess('Produit Ajouté/Edité');
          this.router.navigate(['/private/produits']);
        },
        error: (error: any) => {
          this.toastService.showError('Erreur serveur');
        },
      });
  }
}
