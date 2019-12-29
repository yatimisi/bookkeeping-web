import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
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

  getConsumes(isRepay = false): Observable<Consume[]> {
    // tslint:disable-next-line: prefer-const
    let params = new HttpParams();
    params = params.append('is_repay', `${isRepay}`);

    this.consumes$ = this.httpService.get<Consume[]>(this.urls.consume, { params }).pipe(shareReplay(1));
    return this.consumes$;
  }

  filterConsumes(bookID = '', isRepay = false): Observable<Consume[]> {
    // tslint:disable-next-line: prefer-const
    let params = new HttpParams();

    params = (bookID !== '' ? params.append('book', bookID) : params);
    params = params.append('is_repay', `${isRepay}`);

    return this.httpService.get<Consume[]>(this.urls.consume, { params }).pipe(shareReplay(1));
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
