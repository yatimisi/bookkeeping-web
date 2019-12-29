import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { User } from '@core/models/user.model';
import { HttpService } from '@core/services/shared/http.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  me$: Observable<User>;

  private urls = {
    me: 'users/me',
    users: 'users',
  };

  constructor(private httpService: HttpService) { }

  getUsers(): Observable<User[]> {
    return this.httpService.get<User[]>(this.urls.users);
  }

  me(): Observable<User> {
    this.me$ = this.httpService.get<User>(this.urls.me).pipe(shareReplay(1));
    return this.me$;
  }

  getUser(id: number): Observable<User> {
    return this.httpService.get<User>(`${this.urls.users}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.httpService.post<User>(this.urls.users, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.httpService.patch<User>(`${this.urls.users}/${id}`, user);
  }

  updateMe(user: User): Observable<User> {
    return this.httpService.patch<User>(this.urls.me, user);
  }

  partialUpdateUser(id: number, user: User): Observable<User> {
    return this.httpService.patch<User>(`${this.urls.users}/${id}`, user);
  }

  partialUpdateMe(user: User): Observable<User> {
    return this.httpService.patch<User>(this.urls.me, user);
  }

  deleteUser(id: number): Observable<unknown> {
    return this.httpService.delete(`${this.urls.users}/${id}`);
  }
}
