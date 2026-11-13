import { inject, Service, signal, WritableSignal } from '@angular/core';
import * as lod from 'lodash';

import { Observable, tap } from 'rxjs';
import { HttpTopics } from '../../enums/http-topics';
import { AppHttpService } from '../http/app-http.service';

@Service()
export class ConfigurationService {
  private params: WritableSignal<any> = signal(null);

  private appHttpService = inject(AppHttpService);

  load(): Observable<Object> {
    return this.appHttpService
      .topic(HttpTopics.Configuration)
      .add('fr')
      .get()
      .pipe(
        tap((config: any) => {
          this.params.set(config);
        }),
      );
  }

  get(key: string): string {
    return lod.get(this.params(), key);
  }

  getObject(key: string): any {
    return lod.cloneDeep(this.params()[key]);
  }
}
