import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { ProductStepOne } from '../product-steps/product-step-one/product-step-one';
import { Produit } from '../../model/produit';
import { email, form, required, FormField } from '@angular/forms/signals';
import { ProductStepTwo } from '../product-steps/product-step-two/product-step-two';

import { TuiIcon } from '@taiga-ui/core';
import { ProduitImpl } from '../../model/produit.impl';
import { Intervenant } from '../../model/intervenant';
import { TuiInput } from '@taiga-ui/core';

@Component({
  imports: [ProductStepOne, ProductStepTwo, TuiIcon, TuiInput, FormField],
  selector: 'app-stepper-tester',
  styleUrl: './stepper-tester.css',
  templateUrl: './stepper-tester.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperTester implements OnInit {
  stepNumber = signal<number>(1);

  stepNumber2Valid = signal<boolean>(false);
  stepNumber3Valid = signal<boolean>(false);
  stepNumber4Valid = signal<boolean>(false);

  pageModel = signal<Produit>(new ProduitImpl());

  stepOneForm = form(this.pageModel, (fieldPath) => {
    required(fieldPath.userId);
    required(fieldPath.profileId);
  });

  stepTwoForm = form(this.pageModel, (fieldPath) => {
    required(fieldPath.marqueId);
    required(fieldPath.nom);
  });

  ngOnInit(): void {}

  goTo(step: number) {
    this.stepNumber.set(step);
  }

  submitData(event: Event) {
    event.preventDefault();

    // Perform login logic here
    const payload = this.pageModel();

    console.log(payload);
  }
}
