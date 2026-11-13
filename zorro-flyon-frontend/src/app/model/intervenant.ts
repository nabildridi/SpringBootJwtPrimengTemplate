export interface Intervenant {
  interventionMethod: string;
  intervenantName: string;
  intervenantPays: string;
}

export class IntervenantClass implements Intervenant {
  interventionMethod: string = '';
  intervenantName: string = '';
  intervenantPays: string = '';
}
