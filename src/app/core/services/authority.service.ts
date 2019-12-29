import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { Authority } from '@core/models/authority.model';
import { HttpService } from '@core/services/shared/http.service';


@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

  authorities$: Observable<Authority[]>;

  private urls = {
    authorities: 'authorities',
  };

  constructor(private httpService: HttpService) { }

  getAuthorities(): Observable<Authority[]> {
    this.authorities$ = this.httpService.get<Authority[]>(this.urls.authorities).pipe(shareReplay(1));
    return this.authorities$;
  }

  getAuthoritiesFromBook(bookID = ''): Observable<Authority[]> {
    const params = new HttpParams()
      .set('book', bookID);
    return this.httpService.get<Authority[]>(this.urls.authorities, { params }).pipe(shareReplay(1));
  }

  getAuthority(id: number): Observable<Authority> {
    return this.httpService.get<Authority>(`${this.urls.authorities}/${id}`);
  }

  createAuthority(authority: Authority): Observable<Authority> {
    return this.httpService.post<Authority>(this.urls.authorities, authority);
  }

  updateAuthority(id: number, authority: Authority): Observable<Authority> {
    return this.httpService.patch<Authority>(`${this.urls.authorities}/${id}`, authority);
  }

  partialUpdateAuthority(id: number, authority: Authority): Observable<Authority> {
    return this.httpService.patch<Authority>(`${this.urls.authorities}/${id}`, authority);
  }

  deleteAuthority(id: number): Observable<unknown> {
    return this.httpService.delete(`${this.urls.authorities}/${id}`);
  }
}
