import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem, CartPostItem } from '../constants/cart.interface';
import { CART_URL, ORDER_ENDPOINT } from '../constants/url';
import { OrderItem, OrderResponse } from '../constants/order.interface';
/**
 *
 *
 * @export
 * @class CartManagementService
 */
@Injectable({
  providedIn: 'root',
})
export class CartManagementService {
  private http = inject(HttpClient);

  constructor() {}

  getAllCarts(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(CART_URL);
  }

  postToCart(cartPostItem: CartPostItem) {
    return this.http.post<CartItem>(CART_URL, cartPostItem);
  }

  postOrder(orderItem: OrderItem): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(ORDER_ENDPOINT, orderItem);
  }
}
