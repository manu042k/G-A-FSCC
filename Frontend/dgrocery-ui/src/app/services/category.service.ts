import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL, CATEGORY_ENDPOINT } from '../constants/url';
import { Observable } from 'rxjs';
import { Category } from '../constants/category.interface';
/**
 *
 *
 * @export
 * @class CategoryService
 */
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);

  constructor() {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(BASE_URL + CATEGORY_ENDPOINT);
  }
}
