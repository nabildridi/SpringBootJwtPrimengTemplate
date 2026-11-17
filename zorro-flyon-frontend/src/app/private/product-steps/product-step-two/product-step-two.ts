import { Component, Input, input, WritableSignal } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';

import { Produit } from '../../../model/produit';
import { DaisyTristate } from '../../../shared/tristate-control';

@Component({
  imports: [FormField, DaisyTristate],
  selector: 'app-product-step-two',
  styleUrl: './product-step-two.css',
  templateUrl: './product-step-two.html',
})
export class ProductStepTwo {
  stepTwoForm = input.required<FieldTree<Produit>>();

  @Input()
  inputsModel!: WritableSignal<Produit>;

  calculateEnergiesFromInputs() {
    this.inputsModel.update((produit: Produit) => ({
      ...produit,
      energeticValueKcal: Math.round(
        produit.alcoometrique * 5.53 + (produit.glucose / 10) * 4 + 3.48,
      ),
    }));

    this.inputsModel.update((produit: Produit) => ({
      ...produit,
      energeticValueKj: Math.round(
        produit.alcoometrique * 22.91 + (produit.glucose / 10) * 17 + 14.8,
      ),
    }));
  }
}
