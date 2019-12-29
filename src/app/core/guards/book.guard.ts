import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of, Observable } from 'rxjs';
import { map, mergeMap, shareReplay, switchMap } from 'rxjs/operators';

import { BookService } from '@core/services/book.service';


@Injectable({
  providedIn: 'root'
})
export class BookGuard implements CanActivate {

  constructor(
    private bookService: BookService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    const id = +route.paramMap.get('id');
    console.log(id);
    return this.bookService.getBooks().pipe(
      map(books => books.map(book => book.id)),
      map(books => books.indexOf(id) !== -1)
    );
  }
}
