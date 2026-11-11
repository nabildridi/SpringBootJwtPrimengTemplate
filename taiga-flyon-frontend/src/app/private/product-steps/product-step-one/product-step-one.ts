import { Component, input, WritableSignal } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { TuiAccordion } from '@taiga-ui/kit';
import { Produit } from '../../../model/produit';
import { TuiIcon, TuiInput } from '@taiga-ui/core';
import { Intervenant } from '../../../model/intervenant';

@Component({
  imports: [TuiAccordion, TuiInput, FormField, TuiIcon],
  selector: 'app-product-step-one',
  styleUrl: './product-step-one.css',
  templateUrl: './product-step-one.html',
})
export class ProductStepOne {
  stepOneForm = input.required<FieldTree<Produit>>();
  pageModel = input.required<WritableSignal<Produit>>();
}
