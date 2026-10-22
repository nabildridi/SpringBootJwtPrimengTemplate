import { Component, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { TuiAccordion } from '@taiga-ui/kit';
import { Produit } from '../../../model/produit';
import { TuiInput } from '@taiga-ui/core';

@Component({
  imports: [TuiAccordion, TuiInput, FormField],
  selector: 'app-product-step-two',
  styleUrl: './product-step-two.css',
  templateUrl: './product-step-two.html',
})
export class ProductStepTwo {
  stepTwoForm = input.required<FieldTree<Produit>>();
}
