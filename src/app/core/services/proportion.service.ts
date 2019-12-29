import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { Proportion } from '@core/models/proportion.model';
import { HttpService } from '@core/services/shared/http.service';


@Injectable({
  providedIn: 'root'
})
export class ProportionService {

  private urls = {
    proportion: 'proportion',
  };

  constructor(private httpService: HttpService) { }

  getProportions(): Observable<Proportion[]> {
    return this.httpService.get<Proportion[]>(this.urls.proportion).pipe(shareReplay(1));
  }

  getProportionsFromConsume(consumeID = ''): Observable<Proportion[]> {
    const params = new HttpParams()
      .set('consume', consumeID);
    return this.httpService.get<Proportion[]>(this.urls.proportion, { params }).pipe(shareReplay(1));
  }

  getProportion(id: number): Observable<Proportion> {
    return this.httpService.get<Proportion>(`${this.urls.proportion}/${id}`);
  }

  createProportion(proportion: Proportion): Observable<Proportion> {
    return this.httpService.post<Proportion>(this.urls.proportion, proportion);
  }

  updateProportion(id: number, proportion: Proportion): Observable<Proportion> {
    return this.httpService.patch<Proportion>(`${this.urls.proportion}/${id}`, proportion);
  }

  partialUpdateProportion(id: number, proportion: Proportion): Observable<Proportion> {
    return this.httpService.patch<Proportion>(`${this.urls.proportion}/${id}`, proportion);
  }

  deleteProportion(id: number): Observable<unknown> {
    return this.httpService.delete(`${this.urls.proportion}/${id}`);
  }
}
