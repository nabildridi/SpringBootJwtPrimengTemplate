import { inject, Injectable, Service } from '@angular/core';
import * as lod from 'lodash';
import { ConfigurationService } from './configuration-service';

@Service()
export class ListsService {
  private configurationService = inject(ConfigurationService);

  public getGroupedNatures(): any[] {
    let groupedNatures: any[] = [];

    let natures: any[] = this.configurationService.getObject('natures');

    let item = <any>{};
    item.label = 'VINS TRANQUILLES ET EFFERVESCENTS';
    item.value = '';
    //Vin,Vin nouveau en fermentation,Champagne,Crémant,Vin mousseux
    let itemsOfGroup: any[] = lod.filter(natures, function (o) {
      return (
        o.value == 'val1' ||
        o.value == 'val20' ||
        o.value == 'val30' ||
        o.value == 'val54' ||
        o.value == 'val8'
      );
    });
    item.items = itemsOfGroup;
    groupedNatures.push(item);
    //-----------------------------------------------------------------------------------------------------------------------
    item = <any>{};
    item.label = 'VINS AROMATISÉS & SPÉCIAUX';
    item.value = '';
    //Vermouth, Boisson aromatisée à base de vin, Sangria
    itemsOfGroup = lod.filter(natures, function (o) {
      return o.value == 'val51' || o.value == 'val52' || o.value == 'val58';
    });
    item.items = itemsOfGroup;
    groupedNatures.push(item);
    //-----------------------------------------------------------------------------------------------------------------------
    item = <any>{};
    item.label = 'VINS DOUX & DE LIQUEUR';
    item.value = '';
    //Vin de liqueur, Vin de liqueur gazéifiée, Pineau des Charentes
    itemsOfGroup = lod.filter(natures, function (o) {
      return o.value == 'val28' || o.value == 'val31' || o.value == 'val34';
    });
    item.items = itemsOfGroup;
    groupedNatures.push(item);
    //-----------------------------------------------------------------------------------------------------------------------
    item = <any>{};
    item.label = 'EAUX-DE-VIE & BRANDYS';
    item.value = '';
    //Cognac, Armagnac, Brandy ou Weinbrand, Eau-de-vie de vin, Eau-de-vie (Cidre & Poiré), Calvados
    itemsOfGroup = lod.filter(natures, function (o) {
      return (
        o.value == 'val55' ||
        o.value == 'val2' ||
        o.value == 'val45' ||
        o.value == 'val43' ||
        o.value == 'val44' ||
        o.value == 'val35'
      );
    });
    item.items = itemsOfGroup;
    groupedNatures.push(item);
    //-----------------------------------------------------------------------------------------------------------------------
    item = <any>{};
    item.label = 'WHISKIES';
    item.value = '';
    //Whisky ou whiskey
    itemsOfGroup = lod.filter(natures, function (o) {
      return o.value == 'val37';
    });
    item.items = itemsOfGroup;
    groupedNatures.push(item);
    //-----------------------------------------------------------------------------------------------------------------------
    item = <any>{};
    item.label = 'GINS';
    item.value = '';
    //Gin, Dry Gin, Gin distillé, London Gin, London Dry Gin, Boisson spiritueuse aromatisée aux baies de genévrier
    itemsOfGroup = lod.filter(natures, function (o) {
      return (
        o.value == 'val38' ||
        o.value == 'val56' ||
        o.value == 'val39' ||
        o.value == 'val40' ||
        o.value == 'val57' ||
        o.value == 'val41'
      );
    });
    item.items = itemsOfGroup;
    groupedNatures.push(item);
    //-----------------------------------------------------------------------------------------------------------------------
    item = <any>{};
    item.label = 'VODKAS';
    item.value = '';
    //VODKAS
    itemsOfGroup = lod.filter(natures, function (o) {
      return o.value == 'val4' || o.value == 'val6';
    });
    item.items = itemsOfGroup;
    groupedNatures.push(item);
    //-----------------------------------------------------------------------------------------------------------------------
    item = <any>{};
    item.label = 'ANISÉS';
    item.value = '';
    //Boisson spiritueuse anisée, Pastis, Pastis de Marseille
    itemsOfGroup = lod.filter(natures, function (o) {
      return o.value == 'val46' || o.value == 'val47' || o.value == 'val48';
    });
    item.items = itemsOfGroup;
    groupedNatures.push(item);
    //-----------------------------------------------------------------------------------------------------------------------
    item = <any>{};
    item.label = 'LIQUEURS & SPIRITUEUX SUCRÉS';
    item.value = '';
    //Liqueur, Liqueur gazéifiée
    itemsOfGroup = lod.filter(natures, function (o) {
      return o.value == 'val32' || o.value == 'val33';
    });
    item.items = itemsOfGroup;
    groupedNatures.push(item);
    //-----------------------------------------------------------------------------------------------------------------------
    item = <any>{};
    item.label = 'RHUMS & CANNE';
    item.value = '';
    //Rhum, Cachaça
    itemsOfGroup = lod.filter(natures, function (o) {
      return o.value == 'val36' || o.value == 'val49';
    });
    item.items = itemsOfGroup;
    groupedNatures.push(item);
    //-----------------------------------------------------------------------------------------------------------------------
    item = <any>{};
    item.label = 'AGAVE';
    item.value = '';
    //Mezcal, Tequila
    itemsOfGroup = lod.filter(natures, function (o) {
      return o.value == 'val50' || o.value == 'val59';
    });
    item.items = itemsOfGroup;
    groupedNatures.push(item);
    //-----------------------------------------------------------------------------------------------------------------------
    item = <any>{};
    item.label = 'BIÈRES';
    item.value = '';
    //BIÈRES
    itemsOfGroup = lod.filter(natures, function (o) {
      return o.value == 'val3';
    });
    item.items = itemsOfGroup;
    groupedNatures.push(item);
    //-----------------------------------------------------------------------------------------------------------------------
    item = <any>{};
    item.label = 'SANS ALCOOL';
    item.value = '';
    //Vin désalcoolisé, Vin partiellement désalcoolisé, Vin de France désalcoolisé, Vin mousseux gazéifié désalcoolisé,Sans alcool
    itemsOfGroup = lod.filter(natures, function (o) {
      return (
        o.value == 'val7' ||
        o.value == 'val21' ||
        o.value == 'val29' ||
        o.value == 'val17' ||
        o.value == 'val5'
      );
    });
    item.items = itemsOfGroup;
    groupedNatures.push(item);

    return groupedNatures;
    //return natures;
  }

  public getList(sectionName: string): any[] {
    let l: any[] = this.configurationService.getObject(sectionName);
    return l;
  }

  public getMillesimes(): any[] {
    let liste = this.getList('millesimes');

    let year: number = new Date().getFullYear();

    for (let i = year; i >= 1950; i--) {
      liste.push({
        value: i + '',
        label: i + '',
      });
    }

    return liste;
  }

  public findNodeInTreeData(dataArray: any[], id: string): any {
    for (let parent of dataArray) {
      for (let child of parent.items) {
        if (child.value == id) {
          return child.label;
        }
      }
    }
  }
}
