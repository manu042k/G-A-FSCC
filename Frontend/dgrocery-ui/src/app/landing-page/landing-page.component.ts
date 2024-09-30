import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBannerComponent } from '../add-banner/add-banner.component';
import { FeatureCategoriesComponent } from '../feature-categories/feature-categories.component';
import { ProductContainerComponent } from '../product-container/product-container.component';
import { ProductItemComponent } from '../product-container/product-item/product-item.component';
/**
 *
 *
 * @export
 * @class LandingPageComponent
 */
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    AddBannerComponent,
    FeatureCategoriesComponent,
    ProductContainerComponent,
    ProductItemComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {}
