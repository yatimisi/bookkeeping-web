import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { Book } from '@core/models/book.model';
import { HttpService } from '@core/services/shared/http.service';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  books$: Observable<Book[]>;
  book$: Observable<Book>;

  private urls = {
    books: 'accountbooks',
    leave: 'leave',
  };

  constructor(private httpService: HttpService) { }

  getBooks(): Observable<Book[]> {
    this.books$ = this.httpService.get<Book[]>(this.urls.books).pipe(shareReplay(1));
    return this.books$;
  }

  getBook(id: number): Observable<Book> {
    this.book$ = this.httpService.get<Book>(`${this.urls.books}/${id}`).pipe(shareReplay(1));
    return this.book$;
  }

  createBook(book: Book): Observable<Book> {
    return this.httpService.post<Book>(this.urls.books, book);
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.httpService.patch<Book>(`${this.urls.books}/${id}`, book);
  }

  partialUpdateBook(id: number, book: Book): Observable<Book> {
    return this.httpService.patch<Book>(`${this.urls.books}/${id}`, book);
  }

  deleteBook(id: number): Observable<unknown> {
    return this.httpService.delete(`${this.urls.books}/${id}`);
  }

  leaveBook(id: number): Observable<unknown> {
    return this.httpService.post(`${this.urls.leave}/${id}`, {});
  }
}
