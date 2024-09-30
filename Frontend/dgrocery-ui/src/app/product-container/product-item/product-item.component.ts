import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CartManagementService } from 'src/app/services/cart-management.service';
import { CartItem, CartPostItem } from 'src/app/constants/cart.interface';
/**
 *
 *
 * @export
 * @class ProductItemComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private cartService = inject(CartManagementService);

  @Input() productId: number = 0;
  @Input() productName: string = '';
  @Input() productPrice: number = 0;
  @Input() productQuantity: number = 0;
  @Input() productImageUrl: string = 'no-image.jpg';

  addToCartQuantity: number = 0;
  cartItems: CartItem[] = [];
  cartItem: CartItem | null = null;
  onAddQuantity(): void {
    this.addToCartQuantity = Math.min(
      this.productQuantity,
      this.addToCartQuantity + 1
    );
  }

  onRemoveQuantity(): void {
    this.addToCartQuantity = Math.max(0, this.addToCartQuantity - 1);
  }

  onAddToCart(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
    } else {
      const cartPostItem: CartPostItem = {
        product: this.productId,
        quantity: this.addToCartQuantity,
      };
      this.cartService.postToCart(cartPostItem).subscribe((response) => {});
    }
  }

  ngOnInit(): void {
    this.cartService.getAllCarts().subscribe(
      (items: CartItem[]) => {
        this.cartItems = items;
        this.cartItem = this.findCartItemById(this.cartItems, this.productId);
        this.addToCartQuantity = this.cartItem?.quantity || 0;
      },
      (error) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  findCartItemById(items: CartItem[], productId: number): CartItem | null {
    return items.find((item) => item.product.id === productId) || null;
  }
}
