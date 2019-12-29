import { Injectable } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

import { LocalStorageKeys } from '@core/enums/local-storage-keys.enum';
import { Token } from '@core/models/token.model';
import { User } from '@core/models/user.model';
import { HttpService } from '@core/services/shared/http.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urls = {
    login: 'token',
    refresh: 'token/refresh',
    forgot: 'users/password-reset',
    passwordSet: 'users/password-set',
    join: 'users',
  };

  constructor(private httpService: HttpService) { }

  login(data: User): Observable<Token> {
    return this.httpService.post<Token>(this.urls.login, data)
      .pipe(this.setTokenPipeline);
  }

  logout(): void {
    localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
    localStorage.removeItem(LocalStorageKeys.REFRESH_TOKEN);
  }

  refresh(): Observable<Token> {
    return this.httpService.post<Token>(this.urls.refresh, { refresh: this.refreshToken })
      .pipe(this.setTokenPipeline);
  }

  forgot(user: User): Observable<unknown> {
    return this.httpService.post(this.urls.forgot, { email: user.email });
  }

  passwordSet(uid: string, token: string, toNewPassword: string, toPasswordConfirm: string): Observable<unknown> {
    return this.httpService.post(`${this.urls.passwordSet}/${uid}/${token}`, {
      password: toNewPassword,
      passwordConfirm: toPasswordConfirm
    });
  }

  join(user: User): Observable<unknown> {
    return this.httpService.post(this.urls.join, { email: user.email });
  }

  private setLocalStorageToken(token: Token): void {
    localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, token.access);
    localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN, token.refresh);
  }

  get setTokenPipeline(): OperatorFunction<Token, Token> {
    return map(
      (token: Token) => {
        this.setLocalStorageToken(token);
        return token;
      }
    );
  }

  get isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  get accessToken(): string {
    return localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
  }

  get refreshToken(): string {
    return localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN);
  }
}
