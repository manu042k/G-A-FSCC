import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';
import { Product } from '../constants/product.interface';
/**
 *
 *
 * @export
 * @class ProductContainerComponent
 */
@Component({
  selector: 'app-product-container',
  standalone: true,
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './product-container.component.html',
  styleUrl: './product-container.component.scss',
})
export class ProductContainerComponent {
  @Input() productList?: Product[] | null;
}
