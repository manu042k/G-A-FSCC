import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartManagementService } from '../services/cart-management.service';
import { CartItem } from '../constants/cart.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../constants/user.interface';
import { LoginService } from '../services/login.service';
import { FormsModule } from '@angular/forms';
import { OrderItem, OrderResponse } from '../constants/order.interface';
/**
 *
 *
 * @export
 * @class CartComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private cartManagementService = inject(CartManagementService);
  private router = inject(Router);
  userInfo$?: Observable<User>;

  private loginservice = inject(LoginService);

  cartItems$?: Observable<CartItem[]>;
  totalPrice: number = 0;
  cartTitle: string = 'Your Cart';
  shippingAddress: string = '';
  selectedPaymentMethod: string = 'credit_card';
  orderDetails!: OrderResponse;

  ngOnInit(): void {
    this.cartItems$ = this.cartManagementService.getAllCarts();

    this.cartItems$.subscribe((cartItems) => {
      for (let i = 0; i < cartItems.length; i++) {
        this.totalPrice += cartItems[i].product.price * cartItems[i].quantity;
      }
    });
    this.loginservice.getUserInfo().subscribe((userInfo) => {
      this.shippingAddress =
        userInfo.street_address +
        ', ' +
        userInfo.city +
        ', ' +
        userInfo.state +
        ', ' +
        userInfo.postal_code +
        ', ' +
        userInfo.country;
    });
  }

  onCancel(): void {
    this.router.navigate(['product-list']);
  }
  onConfirm(): void {
    const orderItem: OrderItem = {
      payment_method: this.selectedPaymentMethod,
      shipping_address: this.shippingAddress,
    };
    this.cartManagementService
      .postOrder(orderItem)
      .subscribe((orderResponse) => {
        this.orderDetails = orderResponse;
      });
  }
}
