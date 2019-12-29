import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { Category } from '@core/models/category.model';
import { HttpService } from '@core/services/shared/http.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories$: Observable<Category[]>;

  private urls = {
    categories: 'categories',
  };

  constructor(private httpService: HttpService) { }

  getCategories(): Observable<Category[]> {
    this.categories$ = this.httpService.get<Category[]>(this.urls.categories).pipe(shareReplay(1));
    return this.categories$;
  }

  getCategory(id: number): Observable<Category> {
    return this.httpService.get<Category>(`${this.urls.categories}/${id}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.httpService.post<Category>(this.urls.categories, category);
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    return this.httpService.patch<Category>(`${this.urls.categories}/${id}`, category);
  }

  partialUpdateCategory(id: number, category: Category): Observable<Category> {
    return this.httpService.patch<Category>(`${this.urls.categories}/${id}`, category);
  }

  deleteCategory(id: number): Observable<unknown> {
    return this.httpService.delete(`${this.urls.categories}/${id}`);
  }
}
