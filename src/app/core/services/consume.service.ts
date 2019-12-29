import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { Consume } from '@core/models/consume.model';
import { HttpService } from '@core/services/shared/http.service';


@Injectable({
  providedIn: 'root'
})
export class ConsumeService {

  consumes$: Observable<Consume[]>;

  private urls = {
    consume: 'consume',
  };

  constructor(private httpService: HttpService) { }

  getConsumes(): Observable<Consume[]> {
    this.consumes$ = this.httpService.get<Consume[]>(this.urls.consume).pipe(shareReplay(1));
    return this.consumes$;
  }

  getConsume(id: number): Observable<Consume> {
    return this.httpService.get<Consume>(`${this.urls.consume}/${id}`);
  }

  createConsume(consume: Consume): Observable<Consume> {
    return this.httpService.post<Consume>(this.urls.consume, consume);
  }

  updateConsume(id: number, consume: Consume): Observable<Consume> {
    return this.httpService.patch<Consume>(`${this.urls.consume}/${id}`, consume);
  }

  partialUpdateConsume(id: number, consume: Consume): Observable<Consume> {
    return this.httpService.patch<Consume>(`${this.urls.consume}/${id}`, consume);
  }

  deleteConsume(id: number): Observable<unknown> {
    return this.httpService.delete(`${this.urls.consume}/${id}`);
  }
}
