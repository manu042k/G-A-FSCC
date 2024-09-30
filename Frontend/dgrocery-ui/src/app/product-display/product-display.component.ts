import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ProductContainerComponent } from '../product-container/product-container.component';
import { map, Observable } from 'rxjs';
import { Product } from '../constants/product.interface';
import { ProductService } from '../services/product.service';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Category } from '../constants/category.interface';
/**
 *
 *
 * @export
 * @class ProductDisplayComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [CommonModule, ProductContainerComponent, FormsModule, NgFor],
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.scss'],
})
export class ProductDisplayComponent implements OnInit {
  productList$?: Observable<Product[]>;
  categories$?: Observable<Category[]>;
  selectedCategoryId: number | undefined;
  searchQuery: string = '';

  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
    this.onSearch();
  }

  onSearch() {
    this.productList$ = this.productService
      .getProducts()
      .pipe(map((products) => this.filterProducts(products)));
  }

  onClear() {
    this.searchQuery = '';
    this.selectedCategoryId = undefined;
    this.onSearch();
  }

  onCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const categoryId = selectElement.value;

    this.selectedCategoryId =
      categoryId === 'undefined' ? undefined : parseInt(categoryId, 10);

    this.onSearch();
  }

  private filterProducts(products: Product[]): Product[] {
    return products.filter((product) => {
      const matchesSearchQuery =
        !this.searchQuery ||
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory =
        this.selectedCategoryId === undefined ||
        product.category === this.selectedCategoryId;

      return matchesSearchQuery && matchesCategory;
    });
  }
}
