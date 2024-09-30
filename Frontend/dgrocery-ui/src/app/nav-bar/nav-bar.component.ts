import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from '../pipes/search-pipe.pipe';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CartManagementService } from '../services/cart-management.service';
/**
 *
 *
 * @export
 * @class NavBarComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, SearchPipe, FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  title: string = 'Dgrocery';
  message: string = '⚡️ Order now, to get in 15 mins';
  userNoprofilePath: string = 'no-image.jpg';
  cartItemCount: number = 0;

  private router = inject(Router);
  private authService = inject(AuthService);
  private cartManagementService = inject(CartManagementService);

  onNavButtonClick(path: string): void {
    if (path === 'user') {
      const goToPath = this.authService.isLoggedIn() ? '/profile' : '/login';
      this.router.navigate([goToPath]);
    } else if (path === 'cart') {
      const goToPath = this.authService.isLoggedIn() ? '/cart' : '/login';
      this.router.navigate([goToPath]);
    } else {
      this.router.navigate([path]);
    }
  }

  ngOnInit(): void {
    this.cartManagementService.getAllCarts().subscribe((cartItems) => {
      this.cartItemCount = cartItems.length;
    });
  }
}
