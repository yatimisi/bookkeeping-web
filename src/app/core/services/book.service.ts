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

  private urls = {
    books: 'accountbooks',
  };

  constructor(private httpService: HttpService) { }

  getBooks(): Observable<Book[]> {
    this.books$ = this.httpService.get<Book[]>(this.urls.books).pipe(shareReplay(1));
    return this.books$;
  }

  getBook(id: number): Observable<Book> {
    return this.httpService.get<Book>(`${this.urls.books}/${id}`);
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
}