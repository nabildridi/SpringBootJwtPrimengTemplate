import { Component, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { TuiAccordion } from '@taiga-ui/kit';
import { Produit } from '../../../model/produit';
import { TuiInput } from '@taiga-ui/core';

@Component({
  imports: [TuiAccordion, TuiInput, FormField],
  selector: 'app-product-step-one',
  styleUrl: './product-step-one.css',
  templateUrl: './product-step-one.html',
})
export class ProductStepOne {
  stepOneForm = input.required<FieldTree<Produit>>();
}
