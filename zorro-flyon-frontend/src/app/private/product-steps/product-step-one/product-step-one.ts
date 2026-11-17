import { Component, Input, input, OnInit, signal, WritableSignal } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { Produit } from '../../../model/produit';
import { DropdownService } from '../../../services/utils/dropdown-service';
import { ListsService } from '../../../services/configuration/lists-service';
import { HttpTopics } from '../../../enums/http-topics';
import { StorageService } from '../../../services/storage/storage-service';
import { FormsModule } from '@angular/forms';
import { IntervenantClass } from '../../../model/intervenant';
import { DaisyGroupedSelect } from '../../../shared/grouped-select-input';
import { AppHttpService } from '../../../services/http/app-http.service';
import { DaisyCollapse } from '../../../shared/styled-collapse';
import { DaisyTextInput } from '../../../shared/text-input';
import { DaisySelectInput } from '../../../shared/select-input';
import { DaisyCountrySelectInput } from '../../../shared/country-select-input';
import { DaisyMultiButtonSelector } from '../../../shared/multi-button-selector';

@Component({
  imports: [
    FormField,
    FormsModule,
    DaisyGroupedSelect,
    DaisyCollapse,
    DaisyTextInput,
    DaisySelectInput,
    DaisyCountrySelectInput,
    DaisyMultiButtonSelector,
  ],
  selector: 'app-product-step-one',
  styleUrl: './product-step-one.css',
  templateUrl: './product-step-one.html',
})
export class ProductStepOne implements OnInit {
  stepOneForm = input.required<FieldTree<Produit>>();
  @Input()
  inputsModel!: WritableSignal<Produit>;

  @Input()
  productImage!: WritableSignal<File | null>;

  profileId: string = '';

  marques = signal<any[]>([]);
  natures: any[] = [];
  millesimes: any[] = [];

  previewOpened = signal<boolean>(false);

  constructor(
    private appHttpService: AppHttpService,
    private dropDownService: DropdownService,
    private listsService: ListsService,
    private storageService: StorageService,
  ) {
    //get data
    this.profileId = this.storageService.getProfileId();
    this.natures = this.listsService.getGroupedNatures();
    this.millesimes = this.listsService.getMillesimes();
  }

  togglePreview() {
    this.previewOpened.update((value) => !value);
  }

  removeFile(): void {
    this.productImage.set(null);
  }

  deleteLogo() {
    this.inputsModel()!.resizedImage = null;
    this.inputsModel()!.originalImage = null;
  }

  ngOnInit(): void {
    this.listMarques();
  }

  listMarques() {
    this.appHttpService
      .topic(HttpTopics.Marques)
      .add('list')
      .add(this.profileId)
      .get()
      .subscribe({
        next: (result: boolean) => {
          this.marques.set(this.dropDownService.listToDropdownData(result, 'name', 'id'));
        },
        error: (error: any) => {},
      });
  }

  addIntervenant() {
    this.inputsModel.update((produit: Produit) => ({
      ...produit,
      intervenants: [...produit.intervenants, new IntervenantClass()],
    }));
  }

  deleteIntervenant(index: number) {
    this.inputsModel.update((produit: Produit) => ({
      ...produit,
      intervenants: [
        ...produit.intervenants.slice(0, index),
        ...produit.intervenants.slice(index + 1),
      ],
    }));
  }
}
