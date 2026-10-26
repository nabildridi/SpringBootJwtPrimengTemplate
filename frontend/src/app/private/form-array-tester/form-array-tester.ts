import { Component, signal } from '@angular/core';
import { Intervenant } from '../../model/intervenant';
import { form, FormField } from '@angular/forms/signals';
import { TuiIcon, TuiInput } from '@taiga-ui/core';
import { FormArray } from '@angular/forms';

interface ModelData {
  intervenants: Intervenant[];
}

@Component({
  imports: [TuiInput, TuiIcon, FormField],
  selector: 'app-form-array-tester',
  styleUrl: './form-array-tester.css',
  templateUrl: './form-array-tester.html',
})
export class FormArrayTester {
  dataModel = signal<ModelData>({
    intervenants: [],
  });

  dataForm = form(this.dataModel);

  addIntervenant() {
    if (!this.dataModel().intervenants == null) this.dataModel().intervenants = [];
    this.dataModel().intervenants.push(new Intervenant());

    this.dataModel.update((values) => {
      return [...values, new Intervenant()];
    });
  }

  deleteIntervenant(index: number) {
    this.dataModel().intervenants.splice(index, 1);
  }

  submitData(event: Event) {
    event.preventDefault();

    // Perform login logic here
    const payload = this.dataModel();

    console.log(payload);
  }
}
