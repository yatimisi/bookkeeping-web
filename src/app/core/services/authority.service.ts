import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { Authority } from '@core/models/authority.model';
import { HttpService } from '@core/services/shared/http.service';


@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

  authority$: Observable<Authority[]>;

  private urls = {
    authorities: 'authorities',
  };

  constructor(private httpService: HttpService) { }

  getAuthorities(): Observable<Authority[]> {
    this.authority$ = this.httpService.get<Authority[]>(this.urls.authorities).pipe(shareReplay(1));
    return this.authority$;
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
