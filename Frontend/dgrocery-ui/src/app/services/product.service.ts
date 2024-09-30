import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../constants/product.interface';
import {
  BASE_URL,
  PRODUCT_BY_CATEGORY_ID_ENDPOINT,
  PRODUCT_ENDPOINT,
} from '../constants/url';
/**
 *
 *
 * @export
 * @class ProductService
 */
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  constructor() {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(BASE_URL + PRODUCT_ENDPOINT);
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      BASE_URL + PRODUCT_BY_CATEGORY_ID_ENDPOINT + categoryId + '/'
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(
      BASE_URL + PRODUCT_ENDPOINT + product.id,
      product
    );
  }
}
