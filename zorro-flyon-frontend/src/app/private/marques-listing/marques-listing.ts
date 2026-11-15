import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { Marque } from '../../model/marque';
import { HttpTopics } from '../../enums/http-topics';
import { CountriesService } from '../../services/countries/countries-service';
import { StorageService } from '../../services/storage/storage-service';
import { FormsModule } from '@angular/forms';
import { StyledInfo } from '../../shared/styled-info';
import { AppHttpService } from '../../services/http/app-http.service';
import { ToastService } from '../../services/toast/toast.service';
import { TableService } from '../../services/table/table-service';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  imports: [FormsModule, StyledInfo, NzTableModule, NzModalModule],
  selector: 'app-marques-listing',
  styleUrl: './marques-listing.css',
  templateUrl: './marques-listing.html',
  providers: [],
})
export class MarquesListing implements OnInit {
  data = signal<any>([]);
  profileId?: string = '';
  totalRows = signal<number>(0);
  globalFilterText = '';
  readonly pageSize = 10;

  constructor(
    private appHttpService: AppHttpService,
    private storageService: StorageService,
    private router: Router,
    private toastService: ToastService,
    public countriesService: CountriesService,
    private tableService: TableService,
    private nzModalService: NzModalService,
  ) {
    this.profileId = this.storageService.getProfileId();
  }

  ngOnInit() {}

  searchGlobalFilter(value: string) {
    this.globalFilterText = value || '';
    let output = this.tableService.makeGlobalSearch(this.pageSize, this.globalFilterText);
    this.sendRequest(output);
  }

  add() {
    let marque: Marque = {
      id: null,
      profileId: '',
      name: '',
      address: '',
      city: '',
      zipCode: '',
      country: '',
      site: '',
      presentation: '',
      originalLogo: undefined,
      resizedLogo: undefined,
      showLogoFiche: true,
      createdAt: new Date(),
    };
    marque.profileId = this.profileId!;
    this.router.navigate(['/private/marques-add-update'], {
      state: { marque: marque },
    });
  }

  update(marque: Marque) {
    this.router.navigate(['/private/marques-add-update'], {
      state: { marque: marque },
    });
  }

  confirmDelete(marque: Marque) {
    this.nzModalService.confirm({
      nzTitle: 'Opération dangeureuse',
      nzContent:
        'Si vous effacer cette marque, tous les produits associés seront aussi effacés, êtes-vous sûr?',
      nzOkText: 'Supprimer',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.delete(marque),
      nzCancelText: 'Annuler',
      nzOnCancel: () => {},
    });
  }

  delete(marque: Marque) {
    this.appHttpService
      .topic(HttpTopics.Marques)
      .add(marque.id)
      .delete()
      .subscribe({
        next: (result: boolean) => {
          this.toastService.showSuccess('Marque effacée');
          this.reload();
        },
        error: (error: any) => {
          this.toastService.showError('Erreur serveur');
        },
      });
  }

  reload() {
    let request = this.tableService.getFirstPage(this.pageSize);
    this.globalFilterText = '';
    this.sendRequest(request);
  }

  loadFromServer(receivedEvent: NzTableQueryParams) {
    let request = this.tableService.convert(receivedEvent);
    this.sendRequest(request);
  }

  sendRequest(request: any) {
    this.appHttpService
      .topic(HttpTopics.Marques)
      .add('paginate')
      .post(request)
      .subscribe({
        next: (json: any) => {
          if (json) {
            this.data.set(json['content']);
            this.totalRows.set(json.totalElements);
          }
        },
        error: (e: any) => {},
      });
  }
}
