import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../constants/category.interface';
import { Observable, of } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from '../constants/product.interface';
import { ProductContainerComponent } from '../product-container/product-container.component';
import { ProductItemComponent } from '../product-container/product-item/product-item.component';
import { switchMap, tap } from 'rxjs/operators';
/**
 *
 *
 * @export
 * @class FeatureCategoriesComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-feature-categories',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    ProductContainerComponent,
    ProductItemComponent,
  ],
  templateUrl: './feature-categories.component.html',
  styleUrls: ['./feature-categories.component.scss'],
})
export class FeatureCategoriesComponent implements OnInit {
  title: string = 'Featured Categories';
  categories$?: Observable<Category[]>;
  products$?: Observable<Product[]>;
  activeCategoryId?: number;

  private router = inject(Router);
  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
    this.categories$
      .pipe(
        tap((categories) => (this.activeCategoryId = categories[0]?.id)),
        switchMap((categories) =>
          this.activeCategoryId
            ? this.productService.getProductsByCategory(this.activeCategoryId)
            : of([])
        )
      )
      .subscribe((products) => (this.products$ = of(products)));
  }

  onCategoryClick(categoryId: number): void {
    this.activeCategoryId = categoryId;
    this.loadProducts();
  }

  onMoreButtonClick(): void {
    this.router.navigate(['product-list']);
  }

  loadProducts(): void {
    this.products$ = this.productService.getProductsByCategory(
      this.activeCategoryId!
    );
  }
}
