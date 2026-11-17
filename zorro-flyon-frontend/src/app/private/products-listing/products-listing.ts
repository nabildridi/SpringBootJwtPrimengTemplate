import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpTopics } from '../../enums/http-topics';
import { CountriesService } from '../../services/countries/countries-service';
import { FormsModule } from '@angular/forms';
import { Produit, ProduitObject } from '../../model/produit';
import { StyledInfo } from '../../shared/styled-info';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { AppHttpService } from '../../services/http/app-http.service';
import { StorageService } from '../../services/storage/storage-service';
import { ToastService } from '../../services/toast/toast.service';
import { TableService } from '../../services/table/table-service';

@Component({
  imports: [FormsModule, StyledInfo, NzTableModule, NzModalModule],
  selector: 'app-products-listing',
  styleUrl: './products-listing.css',
  templateUrl: './products-listing.html',
})
export class ProductsListing implements OnInit {
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
    let produit: Produit = new ProduitObject();

    produit.profileId = this.profileId!;
    this.router.navigate(['/private/produits-add-update'], {
      state: { produit: produit },
    });
  }

  update(produit: Produit) {
    this.router.navigate(['/private/produits-add-update'], {
      state: { produit: produit },
    });
  }

  confirmDelete(produit: Produit) {
    this.nzModalService.confirm({
      nzTitle: 'Action irréversible',
      nzContent: 'Etes-vous sûr de vouloir effacer ce produit?',
      nzOkText: 'Supprimer',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.delete(produit),
      nzCancelText: 'Annuler',
      nzOnCancel: () => {},
    });
  }

  delete(produit: Produit) {
    this.appHttpService
      .topic(HttpTopics.Produits)
      .add(produit.id)
      .delete()
      .subscribe({
        next: (result: boolean) => {
          this.toastService.showSuccess('Produit effacé');
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
    request.globalFilter = ['profileId'];
    request.filters = { global: { value: this.profileId, matchMode: 'contains' } };

    this.appHttpService
      .topic(HttpTopics.Produits)
      .add('paginate')
      .post(event)
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
